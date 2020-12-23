import {FiltervalgModell} from '../model-interfaces';
import {VELG_MINE_FILTER} from './lagret-filter-ui-state';
import {ListevisningType} from './ui/listevisning';
import {LagretFilter} from './lagret-filter';
// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';
export const SLETT_ENKELT_FILTER = 'filtrering/SLETT_ENKELT_FILTER';
export const CLEAR_FILTER = 'filtrering/CLEAR_FILTER';
export const ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER = 'filtrering/ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER';
export const SLETT_AKTIVITETER_OG_TILTAK_FILTER = 'filtrering/SLETT_AKTIVITETER_OG_TILTAK_FILTER';
export const VEILEDER_SOKT_FRA_TOOLBAR = 'filtrering/VEILEDER_SOKT_FRA_TOOLBAR';

export enum AktiviteterValg {
    JA = 'JA',
    NEI = 'NEI',
    NA = 'NA'
}

type AktivititetNykkel =
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
    [aktivitet in AktivititetNykkel]: AktiviteterValg;
};

//  Reducer
// TODO Se om det finnes en måte å slippe å definere alt dette for alle filter-reducer
export const initialState: FiltervalgModell = {
    ferdigfilterListe: [],
    alder: [],
    kjonn: null,
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
    hendelser: []
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

export default function reducer(state: FiltervalgModell = initialState, action): FiltervalgModell {
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
        case ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER:
            return {
                ...state,
                [action.data.filterId]: action.data.filterVerdi,
                tiltakstyper: []
            };
        case SLETT_AKTIVITETER_OG_TILTAK_FILTER:
            return {
                ...state,
                [action.data.filterId]: fjern(
                    action.data.filterId,
                    state[action.data.filterId],
                    action.data.filterVerdi
                ),
                tiltakstyper: []
            };
        case SETT_FILTERVALG:
            return {...action.data};
        case VELG_MINE_FILTER:
            return {...action.data.filterValg};
        default:
            return state;
    }
}

export function velgMineFilter(filterVerdi: LagretFilter, filtergruppe: ListevisningType) {
    return {
        type: VELG_MINE_FILTER,
        data: filterVerdi,
        name: filtergruppe
    };
}

export function endreFiltervalg(
    filterId: string,
    filterVerdi,
    filtergruppe: ListevisningType = ListevisningType.enhetensOversikt
) {
    if (Array.isArray(filterVerdi)) {
        filterVerdi.sort();
    }
    if (filterId === 'aktiviteter' && !(filterVerdi.TILTAK === 'JA')) {
        return {
            type: ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER,
            data: {filterId, filterVerdi},
            name: filtergruppe
        };
    }
    return {
        type: ENDRE_FILTER,
        data: {filterId, filterVerdi},
        name: filtergruppe
    };
}

export function slettEnkeltFilter(filterId, filterVerdi, filtergruppe = ListevisningType.enhetensOversikt) {
    if (filterId === 'aktiviteter' && filterVerdi === 'TILTAK') {
        return {
            type: SLETT_AKTIVITETER_OG_TILTAK_FILTER,
            data: {filterId, filterVerdi},
            name: filtergruppe
        };
    }
    return {
        type: SLETT_ENKELT_FILTER,
        data: {filterId, filterVerdi},
        name: filtergruppe
    };
}

export function clearFiltervalg(filtergruppe = ListevisningType.enhetensOversikt) {
    return {type: CLEAR_FILTER, name: filtergruppe};
}

export function veilederSoktFraToolbar() {
    return dispatch => {
        dispatch({type: VEILEDER_SOKT_FRA_TOOLBAR});
    };
}
