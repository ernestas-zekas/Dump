# Patikimi priminimai per Google Apps Script

„Iš URL" prenumeruotas kalendorius Google'e yra **tik skaitymui** ir jo
priminimai telefone **nesuveikia patikimai**. Šis skriptas tą pačią .ics
nuorodą kartą per parą surašo į kalendorių, kurį **tu valdai**, todėl
notifikacijos veikia ir sinchronizuojasi į Samsung telefoną.

Įvykis rodomas **18:00 dieną prieš išvežimą** (kai reikia išnešti konteinerį),
su popup priminimu tuo pačiu momentu.

## Nustatymas (vienkartinis, ~5 min)

1. Eik į <https://script.google.com> → **New project**.
2. Ištrink tuščią `Code.gs` turinį ir įklijuok [Code.gs](Code.gs) turinį.
3. **Project Settings (⚙️) → Time zone → `Europe/Vilnius`**.
4. Viršuje pasirink funkciją **`installTrigger`** → **Run**.
   Patvirtink prašomus leidimus (Calendar prieigą).
5. Telefone: **Samsung Calendar → ☰ → Kalendorių valdymas** → įjunk
   **„Atliekų grafikas"**.
6. Google Calendar → **pašalink seną „Iš URL" prenumeratą**, kad įvykiai
   nesidubliuotų. (Palik tik naują valdomą „Atliekų grafikas".)

Nuo tada skriptas kasdien (~04:00) pats atsinaujina iš feed'o — nieko daryti
nebereikia. Rankiniu būdu gali paleisti `syncWasteCalendar` bet kada.

## Ką galima keisti

- `REMINDER_HOUR` — priminimo valanda (numatyta 18).
- Trigerio dažnis — `installTrigger` viduje `everyDays(1)`.
- `ICS_URL` — jei pasikeistų feed'o adresas.
