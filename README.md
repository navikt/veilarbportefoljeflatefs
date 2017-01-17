# Portefølje-klientside

## Oppsett

Prosjektet har egne githooks som ligger i mappa `.githooks`.
Ta disse i bruk ved å kjøre følgende kommando fra roten av prosjektet.
Det vil ta backup av eksisterende hooks under `.git/hooks`, men disse vil ikke lengre være i bruk.

setup-scriptet er testet i cygwin og gitbash

```
./.githooks/.setup.sh
```

## Kjøre applikasjonen

Scriptet kaller veilarbportefolje og veilarbveileder, som også må startes lokalt. For å muliggjøre kall på tvers av domener må chrome startes med følgende flagg: --disable-web-security --user-data-dir

For å hente enheter må man velge en ident, dette velges ved å skrive identen sist i url-en, eks *?A118889*. 

Ident med én enhet: A118889
Ident med flere enheter: B900001

Ekskjøring: https://a34duvw25632.devillo.no:9594/veilarbportefoljeflatefs/enhet?A118889