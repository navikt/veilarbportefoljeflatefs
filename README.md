# Portefølje-klientside

## Oppsett

Prosjektet har egne githooks som ligger i mappa `.githooks`.
Ta disse i bruk ved å kjøre følgende kommando fra roten av prosjektet.
Det vil ta backup av eksisterende hooks under `.git/hooks`, men disse vil ikke lengre være i bruk.

setup-scriptet er testet i cygwin og gitbash

```
./.githooks/.setup.sh
```

## Kjøre applikasjonen lokalt

Systemet er bygget opp som et mikroarkitektursystem, og er avhengig av 6 ulike applikasjoner:
```
veilarbportefoljeflatefs
veilarbportefoljeflatefs-tekster
veilarbportefolje
veilarbveileder
veilarbportefoljeindeks
veilarbsituasjon
```
Disse 6 applikasjonene må klones med `git clone` og bygges med `mvn clean install` ved første gangs bruk, og deretter sporadisk. OBS: `veilarbportefoljeflatefs-tekster` må bygges før `veilarbportefoljeflatefs` kjøres opp.

### Ved bruk av dev-proxy
Ved bruke av dev-proxy må man åpne applikasjonen på port 8080:

`http://localhost:8080/veilarbportefoljeflatefs/enhet?enhet=0100`

## Frontendbygg

### Før du bygger

Installer nyere versjon av node. Gå inn i `F:\programvare\nodejs` og hent installasjonsfila til node v7.7.4 (eller høyere) og installer.

Det kan også være hensiktsmessig å kjøre `npm i  -g parallelshell webpack typescript less`

Husk og kjøre en `npm i` før du bygger

### Watching

For å watche kjører man `npm run dev`. 

Klientkoden i `veilarbportefoljeflatefs` kompileres og bundles ved hjelp av tsc og webpack. Dette kan gjøres ved å stå i `veilarbportefoljeflatefs/web/src/frontend` og kjøre `npm run build`. Merk at `npm run build` kjøres sammen med `mvn clean install`, så den trenger ikke å kjøres i tillegg.

Høyreklikk på den ignorerte `out/` mappen i IDEA og marker den som "excluded" så slipper du å få kompilerte filer herfra ved søk.

### Chrome

For å muliggjøre kall på tvers av domener må chrome startes med følgende flagg: --disable-web-security --user-data-dir. Dette gjøres ved å høyreklikke på chrome, gå til fanen snarvei, og legge til flaggene under mål. Eks: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir. Merk at chrome skal gi beskjed om at disse flaggene er satt når nettleseren åpnes på nytt.

For å åpne applikasjonen i nettleseren, gå til `https://localhost:9592/veilarbportefoljeflatefs/enhet`.

### Debugging av frontend

Denne applikasjonen bundler ikke med Redux Devtools, men har lagt inn støtte for chrome extensionen
`Redux Devtools extension`, som kommer med både LogMonitor og Inspector. Denne finner man på fellesdisken
under `F:\programvare\Chrome-extensions`.
