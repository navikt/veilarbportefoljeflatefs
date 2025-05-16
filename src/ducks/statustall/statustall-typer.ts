/** Felt som er felles for ulike statustall-typar */
export interface StatustallInnhold {
    totalt: number;
    ufordelteBrukere: number;
    inaktiveBrukere: number;
    venterPaSvarFraNAV: number;
    venterPaSvarFraBruker: number;
    moterMedNAVIdag: number;
    tiltakshendelser: number;
    utgatteVarsel: number;
    utlopteAktiviteter: number;
    ikkeIavtaltAktivitet: number;
    iavtaltAktivitet: number;
    erSykmeldtMedArbeidsgiver: number;
    trengerOppfolgingsvedtak: number;
    nyeBrukereForVeileder: number;
    underVurdering: number;
    mineHuskelapper: number;
}

/** Statustall for veileder.
 *  Same felt som dei vi har på enhet, pluss nokre som er unike for veileder / Min oversikt. */
export interface StatustallVeileder extends StatustallInnhold {
    fargekategoriA: number;
    fargekategoriB: number;
    fargekategoriC: number;
    fargekategoriD: number;
    fargekategoriE: number;
    fargekategoriF: number;
    fargekategoriIngenKategori: number;
}

/** Statustall for enhet.
 * Obs: Det finst per 2024-11-07 to variantar an namna på nøklane for enhet ulike stadar i koden ("medBrukerinnsyn" og "statustallMedBrukerinnsyn"). */
export interface StatustallEnhet {
    medBrukerinnsyn: StatustallInnhold;
    utenBrukerinnsyn: StatustallInnhold;
}
