/**
 * Atliekų grafikas -> Google Calendar (su patikimais priminimais).
 *
 * Kodėl to reikia: „Iš URL" prenumeruotas kalendorius Google'e yra tik
 * skaitymui ir jo priminimai (VALARM) telefone NEsuveikia patikimai.
 * Šis skriptas kartą per parą nuskaito tą patį .ics feed'ą ir surašo
 * įvykius į kalendorių, kurį TU VALDAI - tada notifikacijos veikia ir
 * sinchronizuojasi į Samsung telefoną.
 *
 * Įvykis dedamas 18:00 dieną PRIEŠ išvežimą (kai reikia išnešti konteinerį),
 * su popup priminimu tuo pačiu momentu. Pavadinimas paimamas iš .ics
 * (pvz. „Buitinės atliekos rytoj liepos 8").
 *
 * NUSTATYMAS (vienkartinis):
 *   1. Project Settings -> Time zone: Europe/Vilnius.
 *   2. Paleisk funkciją `installTrigger` (Run). Patvirtink leidimus.
 *   3. Samsung Calendar -> Kalendorių valdymas -> įjunk „Atliekų grafikas".
 *   4. Google Calendar -> pašalink SENĄ „Iš URL" prenumeratą (kad nesidubliuotų).
 */

const ICS_URL       = 'https://ernestas-zekas.github.io/Dump/atliekos.ics';
const CAL_NAME      = 'Atliekų grafikas';
const REMINDER_HOUR = 18;   // 18:00 vietos laiku, dieną prieš išvežimą
const HORIZON_YEARS = 2;    // kiek į priekį valdomas kalendorius

/** Įdiegia kasdienį trigerį ir iškart sinchronizuoja. Paleisk vieną kartą. */
function installTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'syncWasteCalendar') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('syncWasteCalendar').timeBased().everyDays(1).atHour(4).create();
  syncWasteCalendar();
}

/** Pagrindinė sinchronizacija (ją kviečia trigeris). */
function syncWasteCalendar() {
  const cal = getOrCreateCalendar(CAL_NAME);
  const events = fetchEvents(ICS_URL);

  const now = new Date();
  const horizon = new Date(now);
  horizon.setFullYear(now.getFullYear() + HORIZON_YEARS);

  // Pilnas ateities įvykių perkūrimas - feed'as deterministinis ir mažas,
  // tad taip išvengiam dublikatų be sudėtingos dedupinimo logikos.
  cal.getEvents(now, horizon).forEach(function (e) { e.deleteEvent(); });

  let created = 0;
  events.forEach(function (ev) {
    const start = new Date(ev.y, ev.mo - 1, ev.d, REMINDER_HOUR, 0, 0); // 18:00 dieną prieš
    if (start <= now) return;                                           // praeities praleidžiam
    const end = new Date(start.getTime() + 15 * 60 * 1000);
    const e = cal.createEvent(ev.summary, start, end);
    e.removeAllReminders();
    e.addPopupReminder(0);   // suveikia įvykio metu = 18:00
    created++;
  });
  console.log('Sinchronizuota įvykių: ' + created);
}

/** Randa arba sukuria valdomą kalendorių. */
function getOrCreateCalendar(name) {
  const found = CalendarApp.getCalendarsByName(name);
  if (found.length) return found[0];
  return CalendarApp.createCalendar(name, { color: CalendarApp.Color.GREEN });
}

/**
 * Nuskaito .ics ir grąžina [{y, mo, d, summary}], kur data = įvykio DTSTART
 * (jau diena prieš išvežimą, kaip generuoja generate_calendar.py).
 */
function fetchEvents(url) {
  const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (resp.getResponseCode() !== 200) {
    throw new Error('Nepavyko atsisiųsti .ics (HTTP ' + resp.getResponseCode() + ')');
  }
  // RFC 5545 line unfolding (tęsinio eilutės prasideda tarpu/tab).
  const text = resp.getContentText('UTF-8').replace(/\r?\n[ \t]/g, '');
  const lines = text.split(/\r\n|\n|\r/);

  const out = [];
  let cur = null;
  lines.forEach(function (line) {
    if (line === 'BEGIN:VEVENT') {
      cur = {};
    } else if (line === 'END:VEVENT') {
      if (cur && cur.y && cur.summary) out.push(cur);
      cur = null;
    } else if (cur) {
      if (line.indexOf('SUMMARY') === 0) {
        cur.summary = line.substring(line.indexOf(':') + 1).trim();
      } else if (line.indexOf('DTSTART') === 0) {
        const m = line.substring(line.indexOf(':') + 1).match(/(\d{4})(\d{2})(\d{2})/);
        if (m) { cur.y = +m[1]; cur.mo = +m[2]; cur.d = +m[3]; }
      }
    }
  });
  return out;
}
