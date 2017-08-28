import { hentPortefoljeForEnhet, hentPortefoljeForVeileder } from './portefolje';
import { DEFAULT_PAGINERING_STORRELSE } from './../konstanter';
import { nameToStateSliceMap } from './../reducer';

// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';
export const SLETT_ENKELT_FILTER = 'filtrering/SLETT_ENKELT_FILTER';
export const CLEAR_FILTER = 'filtrering/CLEAR_FILTER';
export const ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER = 'filtrering/ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER';
export const SLETT_AKTIVITETER_OG_TILTAK_FILTER = 'filtrering/SLETT_AKTIVITETER_OG_TILTAK_FILTER';

//  Reducer
// TODO Se om det finnes en måte å slippe å definere alt dette for alle filter-reducers
export const initialState = {
    brukerstatus: null,
    alder: [],
    kjonn: [],
    fodselsdagIMnd: [],
    innsatsgruppe: [],
    formidlingsgruppe: [],
    servicegruppe: [],
    rettighetsgruppe: [],
    veiledere: [],
    aktiviteter: {},
    tiltakstyper: [],
    ytelse: null
};

function fjern(verdi, fjernVerdi) {
    if (typeof verdi === 'boolean') {
        return false;
    } else if (Array.isArray(verdi)) {
        return verdi.filter((enkeltVerdi) => enkeltVerdi !== fjernVerdi);
    } else if (fjernVerdi && typeof verdi === 'object') {
        return Object.entries(verdi)
            .filter(([key]) => key !== fjernVerdi)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    } else if (fjernVerdi === null) {
        return null;
    }

    throw new Error(`Kan ikke håndtere fjerning av ${fjernVerdi} fra ${verdi}`);
}

export default function reducer(state = initialState, action) {
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
                [action.data.filterId]: fjern(state[action.data.filterId], action.data.filterVerdi)
            };
        case ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER:
            return {
                ...state,
                [action.data.filterId]: action.data.filterVerdi,
                tiltakstyper : []
            };
        case SLETT_AKTIVITETER_OG_TILTAK_FILTER:
            return {
                ...state,
                [action.data.filterId]: fjern(state[action.data.filterId], action.data.filterVerdi),
                tiltakstyper : []
            };
        case SETT_FILTERVALG:
            return { ...action.data };
        default:
            return state;
    }
}

// Action Creators
export function oppdaterPortefolje(getState, dispatch, filtergruppe, veileder = {}) {
    const state = getState();
    const enhet = state.enheter.valgtEnhet.enhet.enhetId;
    const rekkefolge = state.portefolje.sorteringsrekkefolge;
    const sorteringfelt = state.portefolje.sorteringsfelt;
    const antall = DEFAULT_PAGINERING_STORRELSE;
    const nyeFiltervalg = state[nameToStateSliceMap[filtergruppe]];

    if (filtergruppe === 'enhet') {
        hentPortefoljeForEnhet(enhet, rekkefolge, sorteringfelt, 0, antall, nyeFiltervalg)(dispatch);
    } else if (filtergruppe === 'veileder') {
        hentPortefoljeForVeileder(enhet, veileder, rekkefolge, sorteringfelt, 0, antall, nyeFiltervalg)(dispatch);
    }
}

export function endreFiltervalg(filterId, filterVerdi, filtergruppe = 'enhet', veileder) {
    if (filterId === 'aktiviteter' && !(filterVerdi.TILTAK === "JA")) {
        return (dispatch, getState) => {
            dispatch({
                type: ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER,
                data: {filterId, filterVerdi},
                name: filtergruppe
            });

            if (filtergruppe !== 'veiledere') {
                // TODO Fjerne denne fra filter-reducer
                oppdaterPortefolje(getState, dispatch, filtergruppe, veileder);
            }
        };
    } else {
        return (dispatch, getState) => {
            dispatch({type: ENDRE_FILTER, data: {filterId, filterVerdi}, name: filtergruppe});

            if (filtergruppe !== 'veiledere') {
                // TODO Fjerne denne fra filter-reducer
                oppdaterPortefolje(getState, dispatch, filtergruppe, veileder);
            }
        };
    }
}

export function slettEnkeltFilter(filterId, filterVerdi, filtergruppe = 'enhet', veileder) {
    if (filterId === 'aktiviteter' && !(filterVerdi.TILTAK === "JA" || filterVerdi.TILTAK === "NEI")) {
        return (dispatch, getState) => {
            dispatch({
                type: SLETT_AKTIVITETER_OG_TILTAK_FILTER,
                data: {filterId, filterVerdi},
                name: filtergruppe
            });
            oppdaterPortefolje(getState, dispatch, filtergruppe, veileder);
        }
    } else {
        return (dispatch, getState) => {
            dispatch({ type: SLETT_ENKELT_FILTER, data: { filterId, filterVerdi }, name: filtergruppe });
            oppdaterPortefolje(getState, dispatch, filtergruppe, veileder);
        };

    }

}

export function clearFiltervalg(filtergruppe = 'enhet', veileder) {
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_FILTER, name: filtergruppe });
        oppdaterPortefolje(getState, dispatch, filtergruppe, veileder);
    };
}
