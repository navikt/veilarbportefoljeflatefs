[![CircleCI](https://circleci.com/gh/navikt/veilarbportefoljeflatefs.svg?style=svg)](https://circleci.com/gh/navikt/veilarbportefoljeflatefs)

# Portefølje-klientside / "Oversikten"

Applikasjonen benytter seg av fetchmock-biblioteket for å kunne mocke ut avhengigheter. Se i `mocks/`.

## Oppsett på internt utviklerimage

For å kunne laste ned avhengigheter internt, fjern alle interne url-er i din `~/.npmrc` og legg til webproxy i din `.bashrc`/`.zshrc`:

Se proxy-oppsett for Linux i confluence som utgangspunkt (I Windows trenger du bare eksportere de samme miljøvariablene nevnt her):

https://confluence.adeo.no/x/PQJ8DQ

## Kjøre applikasjonen stand alone

Fra `.`, kjør:

```
npm start
```

P.S. Husk og kjøre en `npm i` før du bygger

### Watching

For å watche uten mocking kjører man `npm run watch`.

For å aktivere mocking kjør `npm run watch:mock`

### Chrome

For å muliggjøre kall på tvers av domener må chrome startes med følgende flagg: --disable-web-security --user-data-dir. Dette gjøres ved å høyreklikke på chrome, gå til fanen snarvei, og legge til flaggene under mål. Eks: "C:\Program Files (x86)\Google\Chrome\Routes\chrome.exe" --disable-web-security --user-data-dir. Merk at chrome skal gi beskjed om at disse flaggene er satt når nettleseren åpnes på nytt.

For å åpne applikasjonen i nettleseren, gå til `https://localhost:9592/veilarbportefoljeflatefs/enhet`.

### Debugging av frontend

Denne applikasjonen bundler ikke med Redux Devtools, men har lagt inn støtte for chrome extensionen
`Redux Devtools extension`, som kommer med både LogMonitor og Inspector. Denne finner man på fellesdisken
under `F:\programvare\Chrome-extensions`.

## Konfigurere git blame til å ignorere spesifikke commits

Om du ønsker kan du konfigurere git blame til å ignorere spesifikke commits definert i [.git-blame-ignore-revs](.git-blame-ignore-revs) (naviger til filen for å se hvilke commits som er ignorert for dette prosjektet).
Commits definert i denne filen vil ikke dukke opp i git blame. Se forøvrig git sin dokumentasjon for hvordan dette fungerer: [https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt](https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt).

Fremgangsmåte:
`git config --global blame.ignoreRevsFile .git-blame-ignore-revs`