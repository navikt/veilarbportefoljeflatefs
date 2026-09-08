import {FargekategoriModell, Hovedmal, InnsatsgruppeGjeldendeVedtak14a} from './bruker-modell';
import {
    AAPFilterArena,
    AAPFilterKelvin,
    AktiviteterFilternokler,
    DagpengerFilter,
    DagpengerFilterArena,
    TiltakspengerFilter,
    TiltakspengerFilterArena,
    UngdomsprogramytelseFilter
} from '../filtrering/filter-konstanter';

/* Vi bruker nøklane i FiltervalgModell til å knyte saman
 * - val i filter i frontenden (checkboksar, radioknappar, inputfelt)
 * - lokal state (redux)
 * - kall til backend for filtrering
 *
 * For å gjere det lettare å sjå koplinga mellom desse har vi laga typar for felta. Då kan dei gjenbrukast i mellom anna "form" på input-element, "filtertag" som viser gjledande filterval, og redux som handterer endringar i filtreringstilstanden.
 * */
export enum Filtervalg {
    ferdigfilterListe = 'ferdigfilterListe',
    alder = 'alder',
    kjonn = 'kjonn',
    landgruppe = 'landgruppe',
    foedeland = 'foedeland',
    fodselsdagIMnd = 'fodselsdagIMnd',
    formidlingsgruppe = 'formidlingsgruppe',
    servicegruppe = 'servicegruppe',
    veiledere = 'veiledere',
    aktiviteter = 'aktiviteter',
    aktiviteterForenklet = 'aktiviteterForenklet',
    tiltakstyper = 'tiltakstyper',
    navnEllerFnrQuery = 'navnEllerFnrQuery',
    rettighetsgruppe = 'rettighetsgruppe',
    manuellBrukerStatus = 'manuellBrukerStatus',
    veilederNavnQuery = 'veilederNavnQuery',
    registreringstype = 'registreringstype',
    cvJobbprofil = 'cvJobbprofil',
    utdanning = 'utdanning',
    utdanningGodkjent = 'utdanningGodkjent',
    utdanningBestatt = 'utdanningBestatt',
    sisteEndringKategori = 'sisteEndringKategori',
    ulesteEndringer = 'ulesteEndringer',
    tolkebehov = 'tolkebehov',
    tolkBehovSpraak = 'tolkBehovSpraak',
    stillingFraNavFilter = 'stillingFraNavFilter',
    geografiskBosted = 'geografiskBosted',
    visGeografiskBosted = 'visGeografiskBosted',
    ensligeForsorgere = 'ensligeForsorgere',
    barnUnder18Aar = 'barnUnder18Aar',
    barnUnder18AarAlder = 'barnUnder18AarAlder',
    fargekategorier = 'fargekategorier',
    gjeldendeVedtak14a = 'gjeldendeVedtak14a',
    innsatsgruppeGjeldendeVedtak14a = 'innsatsgruppeGjeldendeVedtak14a',
    hovedmalGjeldendeVedtak14a = 'hovedmalGjeldendeVedtak14a',
    ytelseAapArena = 'ytelseAapArena',
    ytelseAapKelvin = 'ytelseAapKelvin',
    ytelseTiltakspengerArena = 'ytelseTiltakspengerArena',
    ytelseTiltakspenger = 'ytelseTiltakspenger',
    ytelseDagpengerArena = 'ytelseDagpengerArena',
    ytelseDagpenger = 'ytelseDagpenger',
    ytelseUngdomsprogram = 'ytelseUngdomsprogram'
}

export const erGyldigFiltervalg = (filtervalg: string): filtervalg is Filtervalg => {
    return Object.values(Filtervalg).includes(filtervalg as Filtervalg);
};

/**
 * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * *
 * Om FiltervalgModell får endringer må man samkjøre med Filtermodellen i veilarbportefolje.       *
 * Begge repoene må deployes samtidig, og evt mapping fra lagrede filtre må fikses i backenden så  *
 * ting ikke brekker.                                                                              *
 * Eventuelle lagrede filtre med verdier som har endra seg må så migreres i databasen               *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export interface FiltervalgModell {
    [Filtervalg.ferdigfilterListe]: string[];
    [Filtervalg.alder]: string[];
    [Filtervalg.kjonn]: null | string;
    [Filtervalg.landgruppe]: string[];
    [Filtervalg.foedeland]: string[];
    [Filtervalg.fodselsdagIMnd]?: string[];
    [Filtervalg.formidlingsgruppe]?: string[];
    [Filtervalg.servicegruppe]?: string[];
    [Filtervalg.veiledere]: string[];
    [Filtervalg.aktiviteter]: AktiviteterFilternokler;
    [Filtervalg.aktiviteterForenklet]: string[];
    [Filtervalg.tiltakstyper]: string[];
    [Filtervalg.navnEllerFnrQuery]: string;
    [Filtervalg.rettighetsgruppe]?: string[];
    [Filtervalg.manuellBrukerStatus]?: string[];
    [Filtervalg.veilederNavnQuery]: string; // Dette filteret finst kun i frontend for å søke i en liste med veilederidenter
    [Filtervalg.registreringstype]: string[];
    [Filtervalg.cvJobbprofil]: null | string;
    [Filtervalg.utdanning]: string[];
    [Filtervalg.utdanningGodkjent]: string[];
    [Filtervalg.utdanningBestatt]: string[];
    [Filtervalg.sisteEndringKategori]: null | string;
    [Filtervalg.ulesteEndringer]: null | string;
    [Filtervalg.tolkebehov]: string[];
    [Filtervalg.tolkBehovSpraak]: string[];
    [Filtervalg.stillingFraNavFilter]: string[];
    [Filtervalg.geografiskBosted]: string[];
    [Filtervalg.visGeografiskBosted]: string[]; // Dette filteret brukes kun til å styre visning av bosted-kolonner i frontend
    [Filtervalg.ensligeForsorgere]: string[];
    [Filtervalg.barnUnder18Aar]: string[];
    [Filtervalg.barnUnder18AarAlder]: string[];
    [Filtervalg.fargekategorier]: FargekategoriModell[];
    [Filtervalg.gjeldendeVedtak14a]: string[];
    [Filtervalg.innsatsgruppeGjeldendeVedtak14a]: InnsatsgruppeGjeldendeVedtak14a[];
    [Filtervalg.hovedmalGjeldendeVedtak14a]: Hovedmal[];
    [Filtervalg.ytelseAapArena]: AAPFilterArena[];
    [Filtervalg.ytelseAapKelvin]: AAPFilterKelvin[];
    [Filtervalg.ytelseTiltakspengerArena]: TiltakspengerFilterArena[];
    [Filtervalg.ytelseTiltakspenger]: TiltakspengerFilter[];
    [Filtervalg.ytelseDagpengerArena]: DagpengerFilterArena[];
    [Filtervalg.ytelseDagpenger]: DagpengerFilter[];
    [Filtervalg.ytelseUngdomsprogram]: UngdomsprogramytelseFilter[];
}

/**
 * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * *
 * Om FiltervalgModell får endringer må man samkjøre med Filtermodellen i veilarbportefolje.       *
 * Begge repoene må deployes samtidig, og evt mapping fra lagrede filtre må fikses i backenden så  *
 * ting ikke brekker.                                                                              *
 * Eventuelle lagrede filtre med verdier som har endra seg må så migreres i databasen               *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
