import {FargekategoriModell, Hovedmal, InnsatsgruppeGjeldendeVedtak14a} from './bruker-modell';
import {KategoriModell} from './arbeidsliste';
import {AktiviteterFilternokler} from '../filtrering/filter-konstanter';

export const FiltervalgModellNokler: Record<string, FiltervalgModellProperty> = {
    FERDIGFILTERLISTE: 'ferdigfilterListe',
    NYE_BRUKERE_FOR_VEILEDER: 'nyeBrukereForVeileder',
    KATEGORI: 'arbeidslisteKategori'
} as const;

export type FiltervalgModellProperty = keyof FiltervalgModell;

/**
 * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * * VIKTIG! * * * * *
 * Om FiltervalgModell får endringar må ein også oppdatere Portefoljefilter i veilarbfilter.       *
 * Begge repoa må deployast samstundes, elles knekk ein Mine filter i prod.                        *
 *                                                                                                 *
 * Relevant fil: https://github.com/navikt/veilarbfilter/blob/dev/src/main/java/no/nav/pto/veilarbfilter/domene/PortefoljeFilter.java (2024-11-05)
 * Eksempel-PR frå huskelapp: https://github.com/navikt/veilarbfilter/pull/283                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export interface FiltervalgModell {
    ferdigfilterListe: string[];
    nyeBrukereForVeileder?: boolean;
    inaktiveBrukere?: boolean; // Ikkje i bruk? Verdien blir satt i ferdigfilterListe
    venterPaSvarFraNAV?: boolean; // Ikkje i bruk? Verdien blir satt i ferdigfilterListe
    venterPaSvarFraBruker?: boolean;
    arbeidslisteKategori: KategoriModell[];
    alder?: string[];
    kjonn?: null | string;
    landgruppe: string[];
    foedeland: string[];
    fodselsdagIMnd?: string[];
    innsatsgruppe?: string[];
    formidlingsgruppe?: string[];
    servicegruppe?: string[];
    veiledere: string[];
    ytelse: null | string;
    aktiviteter?: AktiviteterFilternokler;
    aktiviteterForenklet: string[];
    tiltakstyper: string[];
    hovedmal?: string[];
    navnEllerFnrQuery: string;
    rettighetsgruppe?: string[];
    manuellBrukerStatus?: string[];
    veilederNavnQuery: string;
    registreringstype: string[];
    cvJobbprofil: null | string;
    utdanning: string[];
    utdanningGodkjent: string[];
    utdanningBestatt: string[];
    sisteEndringKategori: string[];
    ulesteEndringer: null | string;
    tolkebehov: string[];
    tolkBehovSpraak: string[];
    stillingFraNavFilter: string[];
    geografiskBosted: string[];
    visGeografiskBosted: string[];
    avvik14aVedtak: string[];
    ensligeForsorgere: string[];
    barnUnder18Aar: string[];
    barnUnder18AarAlder: string[];
    fargekategorier: FargekategoriModell[];
    gjeldendeVedtak14a: string[];
    innsatsgruppeGjeldendeVedtak14a: InnsatsgruppeGjeldendeVedtak14a[];
    hovedmalGjeldendeVedtak14a: Hovedmal[];
}
