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

Klientkoden i `veilarbportefoljeflatefs` transpileres og bundles ved hjelp av gulp og browserify. Dette kan gjøres ved å stå i `veilarbportefoljeflatefs/web/src/frontend` og kjøre `npm run build`. Evt kan man kjøre en watcher med kommandoen `gulp watch`. Merk at `npm run build` kjøres sammen med `mvn clean install`, så den trenger ikke å kjøres i tillegg.

For å muliggjøre kall på tvers av domener må chrome startes med følgende flagg: --disable-web-security --user-data-dir. Dette gjøres ved å høyreklikke på chrome, gå til fanen snarvei, og legge til flaggene under mål. Eks: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir. Merk at chrome skal gi beskjed om at disse flaggene er satt når nettleseren åpnes på nytt.

For å åpne applikasjonen i nettleseren, gå til `https://localhost:9592/veilarbportefoljeflatefs/enhet`.
Brukernavn: Z990610
Passord: 