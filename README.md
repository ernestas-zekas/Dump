# Atliekų grafiko kalendorius

## Ką tai daro
Kas savaitę automatiškai patikrina UAB „Nemenčinės komunalininkas“ svetainę,
suranda naujausius pakuočių / stiklo / buitinių atliekų grafikus, ištraukia
datas, kada jūsų adresu tuštinami konteineriai, ir sugeneruoja `atliekos.ics`
failą kalendoriaus prenumeratai.

> **Privatumas:** konkretus adresas (gyvenvietė ir gatvė) kode NELAIKOMAS – jis
> paduodamas per **GitHub Secrets** (`ADDR_VILLAGE`, `ADDR_STREET`), o
> sugeneruotame `atliekos.ics` matomos tik datos ir atliekų rūšys, be adreso.

## Vienkartinis nustatymas

1. Repo **Settings → Secrets and variables → Actions → New repository secret**:
   - `ADDR_VILLAGE` – gyvenvietės pavadinimo fragmentas (kaip rašoma grafike)
   - `ADDR_STREET` – jūsų gatvės pavadinimas
2. **Settings → Actions → General → Workflow permissions → Read and write**
3. **Settings → Pages → Source: Deploy from branch → main**
4. Skiltyje **Actions** paleiskite workflow’ą rankiniu būdu (`Run workflow`)
5. GitHub Pages parodys nuolatinę nuorodą, pvz.:
   `https://JUSU_VARDAS.github.io/REPO/atliekos.ics`

## Kaip atrodo priminimai

Konteinerį reikia išnešti **vakare prieš** išvežimą, todėl kalendoriuje
įvykis dedamas **dieną prieš** atvažiuojant šiukšliavežiui, o pavadinime
matosi tikroji išvežimo diena, pvz.:

> **Buitinės atliekos rytoj vasario 18**  (įvykis rodomas vasario 17)

Prie kiekvieno įvykio pridėtas priminimas (VALARM), suveikiantis
**priminimo dienos 18:00** – jį telefone galima atidėti („snooze“).

## Telefone (prenumerata)

**Samsung telefonas (rekomenduojama – per Google paskyrą):**
Samsung Calendar pats neturi „prenumeruok iš URL“ funkcijos, bet rodo
Google paskyros kalendorius. Todėl:
1. Naršyklėje atidarykite **calendar.google.com** (ne programėlę) → kairėje
   „Kiti kalendoriai“ → **„+“** → **„Iš URL“** → įklijuokite `.ics` nuorodą.
2. Telefone: **Samsung Calendar → ☰ → „Kalendarių valdymas“** → po Google
   paskyra įjunkite „Atliekų grafikas“.
3. Jei iškart nematyti – palaukite kelias valandas arba priverstinai
   sinchronizuokite Google paskyrą.

**iPhone (Apple Calendar):**
Nustatymai → Kalendorius → Paskyros → Pridėti paskyrą → Kita →
Pridėti prenumeruojamą kalendorių → įklijuokite `.ics` nuorodą.

## Svarbu žinoti
- Scriptas **niekada neįrašo neaiškių duomenų** – jei formatas pasikeičia,
  jis nemodifikuoja `.ics`, o workflow’as tampa raudonas ir GitHub atsiunčia
  el. laišką. Tuomet žr. `warnings.log`.
- Trys atskiri parseriai (pakuotės PDF / stiklas PDF / buitinės XLSX), nes
  kiekvieno dokumento formatas skiriasi. Mėnesiai skaitomi dinamiškai, tad
  veikia ir pasikeitus ketvirčiui.
