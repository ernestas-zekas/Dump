# Patikimi priminimai per Google Apps Script

„Iš URL" prenumeruotas kalendorius Google'e yra **tik skaitymui** ir jo
priminimai telefone **nesuveikia patikimai**. Šis skriptas tą pačią .ics
nuorodą kartą per parą surašo į kalendorių, kurį **tu valdai**, todėl
notifikacijos veikia ir sinchronizuojasi į Samsung telefoną.

Įvykis rodomas **18:00 dieną prieš išvežimą** (kai reikia išnešti konteinerį),
su popup priminimu tuo pačiu momentu.

---

## A dalis. Sukurti ir paleisti skriptą (kompiuteryje, ~5 min)

### 1. Sukurk projektą
- Naršyklėje (prisijungęs prie savo Google paskyros) atidaryk
  <https://script.google.com>.
- Spausk **New project** (kairėje viršuje). Atsidarys redaktorius su tuščiu
  `Code.gs` failu.

### 2. Įklijuok kodą
- Redaktoriaus viduryje pažymėk **visą** esamą `Code.gs` turinį (Ctrl+A) ir
  ištrink.
- Atsidaryk [Code.gs](Code.gs), nukopijuok **visą** jo turinį ir įklijuok į
  redaktorių.
- Išsaugok: **Ctrl+S** (arba diskelio ikona).

### 3. Nustatyk laiko juostą (BŪTINA)
- Kairėje spausk **⚙️ Project Settings**.
- Ties **Time zone** pasirink **`(GMT+02:00) Europe/Vilnius`**.
- Grįžk į redaktorių (kairėje **`< >` Editor**).
- ⚠️ Jei praleisi šį žingsnį, priminimai suveiks ne 18:00, o kitu laiku.

### 4. Paleisk `installTrigger`
- Virš kodo esančiame **funkcijų sąraše** (išskleidžiamas meniu, šalia
  „Debug / Run") pasirink **`installTrigger`**.
- Spausk **▶ Run**.

### 5. Patvirtink leidimus (tik pirmą kartą)
Google paprašys leidimo tvarkyti tavo kalendorių:
- Iššokusiame lange spausk **Review permissions** → pasirink savo Google
  paskyrą.
- Pamatysi įspėjimą **„Google hasn't verified this app"** — tai normalu, nes
  skriptą parašei pats sau. Spausk **Advanced** (apačioje kairėje) →
  **Go to <projekto pavadinimas> (unsafe)**.
- Spausk **Allow**.
- Skriptas paleis save iš karto ir sukurs kalendorių.

### 6. Patikrink rezultatą
- Atidaryk <https://calendar.google.com>.
- Kairėje, po „Mano kalendoriai", turi atsirasti **„Atliekų grafikas"**.
- Įjunk jį (varnelė) — turėtum matyti įvykius **18:00 dieną prieš** kiekvieną
  išvežimą, pvz. „Buitinės atliekos rytoj liepos 8".

---

## B dalis. Pašalinti seną prenumeratą (kad nesidubliuotų)

Anksčiau pridėta „Iš URL" prenumerata rodo TUOS PAČIUS įvykius, tik be
veikiančių priminimų. Ją reikia pašalinti:

- <https://calendar.google.com> → kairėje **⚙️ (Nustatymai) → Settings**.
- Kairiajame meniu, po **„Settings for other calendars"**, susirask
  prenumeruotą atliekų kalendorių (pavadinimas kaip .ics viduje arba pati URL
  nuoroda).
- Spausk jį → **Unsubscribe** (arba **Remove calendar**).
- Palik tik naują valdomą **„Atliekų grafikas"**.

---

## C dalis. Įjungti telefone (Samsung)

Samsung Calendar rodo tavo Google paskyros kalendorius:
- **Samsung Calendar → ☰ (meniu) → Kalendorių valdymas / Manage calendars**.
- Po savo Google paskyra įjunk **„Atliekų grafikas"**.
- Jei iškart nematyti — palauk kelias valandas arba priverstinai
  sinchronizuok Google paskyrą (**Nustatymai → Paskyros → Google → Sinchronizuoti**).
- Įsitikink, kad kalendoriaus notifikacijos telefone įjungtos.

---

## Nuo šiol

Skriptas **kasdien (~04:00)** pats nuskaito feed'ą ir atnaujina kalendorių —
daryti nieko nebereikia. Pasikeitus ketvirčiui naujos datos atsiras savaime.

Nori atnaujinti rankiniu būdu? Script redaktoriuje pasirink **`syncWasteCalendar`**
→ **Run**.

## Ką galima keisti (Code.gs viršuje)

- `REMINDER_HOUR` — priminimo valanda (numatyta 18).
- Trigerio dažnis — `installTrigger` viduje `everyDays(1)`.
- `ICS_URL` — jei kada pasikeistų feed'o adresas.
