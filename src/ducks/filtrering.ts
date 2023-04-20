import {FiltervalgModell} from '../model-interfaces';
import {VELG_MINE_FILTER} from './lagret-filter-ui-state';
import {oppdaterAlternativer, OversiktType} from './ui/listevisning';
import {LagretFilter} from './lagret-filter';
import {Dispatch} from 'redux';
// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';
export const SLETT_ENKELT_FILTER = 'filtrering/SLETT_ENKELT_FILTER';
export const CLEAR_FILTER = 'filtrering/CLEAR_FILTER';
export const VEILEDER_SOKT_FRA_TOOLBAR = 'filtrering/VEILEDER_SOKT_FRA_TOOLBAR';

export enum AktiviteterValg {
    JA = 'JA',
    NEI = 'NEI',
    NA = 'NA'
}

type AktivititetNokkel =
    | 'BEHANDLING'
    | 'EGEN'
    | 'GRUPPEAKTIVITET'
    | 'IJOBB'
    | 'MOTE'
    | 'SOKEAVTALE'
    | 'STILLING'
    | 'TILTAK'
    | 'UTDANNINGAKTIVITET';

export type FiltreringAktiviteterValg = {
    [aktivitet in AktivititetNokkel]: AktiviteterValg;
};

//  Reducer
export const initialState: FiltervalgModell = {
    ferdigfilterListe: [],
    alder: [],
    kjonn: null,
    landgruppe: [],
    foedeland: [],
    fodselsdagIMnd: [],
    innsatsgruppe: [],
    formidlingsgruppe: [],
    servicegruppe: [],
    rettighetsgruppe: [],
    veiledere: [],
    aktiviteter: {
        BEHANDLING: AktiviteterValg.NA,
        EGEN: AktiviteterValg.NA,
        GRUPPEAKTIVITET: AktiviteterValg.NA,
        IJOBB: AktiviteterValg.NA,
        MOTE: AktiviteterValg.NA,
        SOKEAVTALE: AktiviteterValg.NA,
        STILLING: AktiviteterValg.NA,
        TILTAK: AktiviteterValg.NA,
        UTDANNINGAKTIVITET: AktiviteterValg.NA
    } as FiltreringAktiviteterValg,
    aktiviteterForenklet: [],
    tiltakstyper: [],
    ytelse: null,
    manuellBrukerStatus: [],
    hovedmal: [],
    navnEllerFnrQuery: '',
    veilederNavnQuery: '',
    registreringstype: [],
    arbeidslisteKategori: [],
    cvJobbprofil: null,
    utdanning: [],
    utdanningGodkjent: [],
    utdanningBestatt: [],
    sisteEndringKategori: [],
    ulesteEndringer: null,
    geografiskBosted: [],
    visGeografiskBosted: [],
    tolkebehov: [],
    tolkBehovSpraak: [],
    stillingFraNavFilter: [],
    avvik14aVedtak: [],
    ensligeForsorgere: []
};

function fjern(filterId, verdi, fjernVerdi) {
    if (typeof verdi === 'boolean') {
        return false;
    } else if (Array.isArray(verdi)) {
        return verdi.filter(enkeltVerdi => enkeltVerdi !== fjernVerdi);
    } else if (filterId === 'aktiviteter') {
        var tomtVerdi = {};
        tomtVerdi[fjernVerdi] = AktiviteterValg.NA;
        return Object.assign({}, verdi, tomtVerdi);
    } else if (fjernVerdi && typeof verdi === 'object') {
        return Object.entries(verdi)
            .filter(([key]) => key !== fjernVerdi)
            .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
    } else if (fjernVerdi === null) {
        return null;
    } else if (typeof verdi === 'string') {
        return '';
    }

    throw new Error(`Kan ikke håndtere fjerning av ${fjernVerdi} fra ${verdi}`);
}

export default function filtreringReducer(state: FiltervalgModell = initialState, action): FiltervalgModell {
    switch (action.type) {
        case CLEAR_FILTER:
            return initialState;
        case ENDRE_FILTER:
            return {
                ...state,
                [action.data.filterId]: action.data.filterVerdi
            };
        case SLETT_ENKELT_FILTER:
            return {
                ...state,
                [action.data.filterId]: fjern(
                    action.data.filterId,
                    state[action.data.filterId],
                    action.data.filterVerdi
                )
            };
        case SETT_FILTERVALG:
            return {...action.data};
        case VELG_MINE_FILTER:
            return {...action.data.filterValg};
        default:
            return state;
    }
}

export function velgMineFilter(filterVerdi: LagretFilter, oversiktType: OversiktType, dispatch: Dispatch) {
    oppdaterAlternativer(dispatch, filterVerdi.filterValg, oversiktType);
    return {
        type: VELG_MINE_FILTER,
        data: filterVerdi,
        name: oversiktType
    };
}

export function endreFiltervalg(
    filterId: string,
    filterVerdi: React.ReactNode,
    oversiktType: OversiktType = OversiktType.enhetensOversikt,
    filterValg: FiltervalgModell,
    dispatch: Dispatch
) {
    if (Array.isArray(filterVerdi)) {
        filterVerdi.sort();
    }
    const updatertFiltervalg = {...filterValg, [filterId]: filterVerdi};
    oppdaterAlternativer(dispatch, updatertFiltervalg, oversiktType);
    return {
        type: ENDRE_FILTER,
        data: {filterId, filterVerdi},
        name: oversiktType
    };
}

export function slettEnkeltFilter(
    filterId,
    filterVerdi,
    oversiktType = OversiktType.enhetensOversikt,
    filterValg: FiltervalgModell,
    dispatch: Dispatch
) {
    const updatertFiltervalg = {...filterValg, [filterId]: fjern(filterId, filterValg[filterId], filterVerdi)};
    oppdaterAlternativer(dispatch, updatertFiltervalg, oversiktType);
    return {
        type: SLETT_ENKELT_FILTER,
        data: {filterId, filterVerdi},
        name: oversiktType
    };
}

export function clearFiltervalg(oversiktType = OversiktType.enhetensOversikt, dispatch: Dispatch) {
    oppdaterAlternativer(dispatch, initialState, oversiktType);
    return {type: CLEAR_FILTER, name: oversiktType};
}

export function veilederSoktFraToolbar() {
    return dispatch => {
        dispatch({type: VEILEDER_SOKT_FRA_TOOLBAR});
    };
}
