import {FargekategoriModell, Hovedmal, InnsatsgruppeGjeldendeVedtak14a} from './bruker-modell';
import {
    AAPFilterArena,
    AAPFilterKelvin,
    AktiviteterFilternokler,
    TiltakspengerFilter,
    TiltakspengerFilterArena
} from '../filtrering/filter-konstanter';

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
    ytelse = 'ytelse',
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
    avvik14aVedtak = 'avvik14aVedtak',
    ensligeForsorgere = 'ensligeForsorgere',

    ytelseAapArena = 'ytelseAapArena',
    ytelseAapKelvin = 'ytelseAapKelvin',
    ytelseTiltakspengerArena = 'ytelseTiltakspengerArena',
    ytelseTiltakspenger = 'ytelseTiltakspenger'
}

/**
 * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * *
 * Om FiltervalgModell får endringar må ein også oppdatere Portefoljefilter i veilarbfilter.       *
 * Begge repoa må deployast samstundes, elles knekk ein Mine filter i prod.                        *
 *                                                                                                 *
 * Relevant fil: https://github.com/navikt/veilarbfilter/blob/dev/src/main/java/no/nav/pto/veilarbfilter/domene/PortefoljeFilter.java (2024-11-05)
 * Eksempel-PR frå huskelapp: https://github.com/navikt/veilarbfilter/pull/283                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export interface FiltervalgModell {
    [Filtervalg.ferdigfilterListe]: string[];
    nyeBrukereForVeileder?: boolean; // Dette filteret finst berre her
    inaktiveBrukere?: boolean; // Dette filteret finst berre her
    venterPaSvarFraNAV?: boolean; // Dette filteret finst berre her
    venterPaSvarFraBruker?: boolean; // Dette filteret finst berre her
    [Filtervalg.alder]?: string[];
    [Filtervalg.kjonn]?: null | string;
    [Filtervalg.landgruppe]: string[];
    [Filtervalg.foedeland]: string[];
    [Filtervalg.fodselsdagIMnd]?: string[];
    innsatsgruppe?: string[]; // Arena-innsatsgruppe // Er dette filteret i bruk meir? Eg ser det ikkje i frontenden. Det pleidde bu saman med Status og brukergrupper. Ingrid, 2025-10-26
    [Filtervalg.formidlingsgruppe]?: string[];
    [Filtervalg.servicegruppe]?: string[];
    [Filtervalg.veiledere]: string[];
    [Filtervalg.ytelse]: null | string;
    [Filtervalg.aktiviteter]?: AktiviteterFilternokler;
    [Filtervalg.aktiviteterForenklet]: string[];
    [Filtervalg.tiltakstyper]: string[];
    hovedmal?: string[]; // Arena-hovedmål // Er dette filteret i bruk meir? Eg ser det ikkje i frontenden. Eg trur det var "søskenfilter" for innsatsgruppe over her. Ingrid, 2025-10-26
    [Filtervalg.navnEllerFnrQuery]: string;
    [Filtervalg.rettighetsgruppe]?: string[];
    [Filtervalg.manuellBrukerStatus]?: string[];
    [Filtervalg.veilederNavnQuery]: string; // Dette filteret finst i veilarbfilter, men ikkje i Filtervalg-klassen hos veilarbportefolje
    [Filtervalg.registreringstype]: string[];
    [Filtervalg.cvJobbprofil]: null | string;
    [Filtervalg.utdanning]: string[];
    [Filtervalg.utdanningGodkjent]: string[];
    [Filtervalg.utdanningBestatt]: string[];
    [Filtervalg.sisteEndringKategori]: string[];
    [Filtervalg.ulesteEndringer]: null | string;
    [Filtervalg.tolkebehov]: string[];
    [Filtervalg.tolkBehovSpraak]: string[];
    [Filtervalg.stillingFraNavFilter]: string[];
    [Filtervalg.geografiskBosted]: string[];
    [Filtervalg.visGeografiskBosted]: string[]; // Dette filteret finst i veilarbfilter, men ikkje i Filtervalg-klassen hos veilarbportefolje
    [Filtervalg.avvik14aVedtak]: string[];
    [Filtervalg.ensligeForsorgere]: string[];
    barnUnder18Aar: string[];
    barnUnder18AarAlder: string[];
    fargekategorier: FargekategoriModell[];
    gjeldendeVedtak14a: string[];
    innsatsgruppeGjeldendeVedtak14a: InnsatsgruppeGjeldendeVedtak14a[];
    hovedmalGjeldendeVedtak14a: Hovedmal[];
    [Filtervalg.ytelseAapArena]: AAPFilterArena[];
    [Filtervalg.ytelseAapKelvin]: AAPFilterKelvin[];
    [Filtervalg.ytelseTiltakspengerArena]: TiltakspengerFilterArena[];
    [Filtervalg.ytelseTiltakspenger]: TiltakspengerFilter[];
}

/**
 * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * *
 * Om FiltervalgModell får endringar må ein også oppdatere Portefoljefilter i veilarbfilter.       *
 * Begge repoa må deployast samstundes, elles knekk ein Mine filter i prod.                        *
 *                                                                                                 *
 * Relevant fil: https://github.com/navikt/veilarbfilter/blob/dev/src/main/java/no/nav/pto/veilarbfilter/domene/PortefoljeFilter.java (2024-11-05)
 * Eksempel-PR frå huskelapp: https://github.com/navikt/veilarbfilter/pull/283                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
