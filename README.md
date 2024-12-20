[![CircleCI](https://circleci.com/gh/navikt/veilarbportefoljeflatefs.svg?style=svg)](https://circleci.com/gh/navikt/veilarbportefoljeflatefs)

**Installere pakker**

For å kunne hente ned @navikt/ds-icons (fram til vi får byttet ut de resterende ikonene) må du legge til en `.npmrc` fil i homemappen med følgende innhold:

```shell
//npm.pkg.github.com/:_authToken=<TOKEN>
@navikt:registry=https://npm.pkg.github.com
```

[Se navikt/frontend](https://github.com/navikt/frontend?tab=readme-ov-file#installere-pakker-lokalt) for å se hvordan du kan generere et token på github.

## Kjøre applikasjonen stand alone

Fra `.`, kjør:

```
npm start
```

P.S. Husk å kjøre en `npm i` før du bygger

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

Om du ønsker er det mulig å konfigurere git blame til å ignorere spesifikke commits definert i [.git-blame-ignore-revs](.git-blame-ignore-revs) (naviger til filen for å se hvilke commits som er ignorert for dette prosjektet).
Commits definert i denne filen vil ikke dukke opp i git blame. Det anbefales å konfigurere dette per git prosjekt da git blame vil feile dersom man feks. har konfigurert dette globalt men det ikke eksisterer en
ignore-fil med riktig navn i det gitte git prosjektet du står i. Se forøvrig git sin dokumentasjon for hvordan git blame og ignoring fungerer: [https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt](https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt).

### Fremgangsmåte

`git config --local blame.ignoreRevsFile .git-blame-ignore-revs`

### Resette git blame dersom man har konfigurert regelen globalt ved et uhell

`git config --global --unset blame.ignoreRevsFile`

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-obo-poao.

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.
