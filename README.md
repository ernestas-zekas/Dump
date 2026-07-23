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

Konteinerį reikia išnešti **vakare prieš** išvežimą, todėl įvykis dedamas
**dieną prieš** atvažiuojant šiukšliavežiui, o pavadinime matosi tikroji
išvežimo diena, pvz.:

> **Buitinės atliekos rytoj vasario 18**  (įvykis rodomas vasario 17)

- Pačiame `.ics` faile prie kiekvieno įvykio yra priminimas **18:00** (VALARM).
- **Telefone** (per Google Apps Script – žr. žemiau) sukuriami **trys**
  priminimai tą vakarą – **18:00, 19:00 ir 19:50** – kad, atmetus vieną
  būnant užsiėmusiam, kitas vis tiek primintų.

## Telefone (kad priminimai tikrai suveiktų)

> ⚠️ **Svarbu:** „Iš URL“ prenumeruotas `.ics` kalendorius Google/Samsung
> telefone yra **tik skaitymui**, ir jo priminimai (VALARM) **nesuveikia
> patikimai** – Google jų neapdoroja ir neleidžia jų valdyti. Kad priminimai
> realiai skambėtų, naudokite **Google Apps Script**: jis tą patį feed’ą
> surašo į kalendorių, kurį **jūs valdote**.

**Samsung / Android (rekomenduojama):**
Sekite [apps-script/README.md](apps-script/README.md) instrukcijas – įkeliate
mažą skriptą į <https://script.google.com>, jis **kasdien** pats atnaujina
kalendorių „Atliekų grafikas“ su **veikiančiais priminimais 18:00 / 19:00 /
19:50**. Nustatoma vieną kartą, toliau viskas automatiška. Priminimų laikus
galima keisti skripto viršuje (`REMINDER_TIMES`).

> Po nustatymo **pašalinkite seną „Iš URL“ prenumeratą** Google kalendoriuje,
> kad įvykiai nesidubliuotų.

**iPhone (Apple Calendar):**
Apple gerbia `.ics` priminimus prenumeratose, tad užtenka prenumeruoti
tiesiogiai (suveiks 18:00 priminimas):
Nustatymai → Kalendorius → Paskyros → Pridėti paskyrą → Kita →
Pridėti prenumeruojamą kalendorių → įklijuokite `.ics` nuorodą.

## Svarbu žinoti
- Scriptas **niekada neįrašo neaiškių duomenų** – jei formatas pasikeičia,
  jis nemodifikuoja `.ics`, o workflow’as tampa raudonas ir GitHub atsiunčia
  el. laišką. Tuomet žr. `warnings.log`.
- Trys atskiri parseriai (pakuotės PDF / stiklas PDF / buitinės XLSX), nes
  kiekvieno dokumento formatas skiriasi. Mėnesiai skaitomi dinamiškai, tad
  veikia ir pasikeitus ketvirčiui.
