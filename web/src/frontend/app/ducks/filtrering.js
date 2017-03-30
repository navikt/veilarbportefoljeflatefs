import { hentPortefoljeForEnhet } from './portefolje';

// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';
export const SLETT_ENKELT_FILTER = 'filtrering/SLETT_ENKELT_FILTER';
export const CLEAR_FILTER = 'filtrering/CLEAR_FILTER';

//  Reducer
export const initialState = {
    nyeBrukere: false,
    inaktiveBrukere: false,
    alder: [],
    kjonn: [],
    fodselsdagIMnd: [],
    innsatsgruppe: [],
    formidlingsgruppe: [],
    servicegruppe: [],
    ytelse: {
        ordinaereDagpenger: false,
        dagpengerUnderPermittering: false,
        aapMaxtid: false,
        aapUnntak: false,
        tiltakspenger: true
    }
};

function fjern(verdi, fjernVerdi) {
    if (typeof verdi === 'boolean') {
        return false;
    } else if (Array.isArray(verdi)) {
        return verdi.filter((enkeltVerdi) => enkeltVerdi !== fjernVerdi);
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
        case SETT_FILTERVALG:
            return { ...action.data };
        default:
            return state;
    }
}

// Action Creators
function oppdaterPortefolje(getState, dispatch) {
    const state = getState();
    const enhet = state.enheter.valgtEnhet.enhet.enhetId;
    const rekkefolge = state.portefolje.sorteringsrekkefolge;
    const sorteringfelt = state.portefolje.sorteringsfelt;
    const fra = state.portefolje.data.fraIndex;
    const antall = state.paginering.sideStorrelse;
    const nyeFiltervalg = state.filtrering;
    hentPortefoljeForEnhet(enhet, rekkefolge, sorteringfelt, fra, antall, nyeFiltervalg)(dispatch);
}

export function endreFiltervalg(filterId, filterVerdi) {
    return (dispatch, getState) => {
        dispatch({ type: ENDRE_FILTER, data: { filterId, filterVerdi } });
        oppdaterPortefolje(getState, dispatch);
    };
}

export function slettEnkeltFilter(filterId, filterVerdi) {
    return (dispatch, getState) => {
        dispatch({ type: SLETT_ENKELT_FILTER, data: { filterId, filterVerdi } });
        oppdaterPortefolje(getState, dispatch);
    };
}

export function clearFiltervalg() {
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_FILTER });
        oppdaterPortefolje(getState, dispatch);
    };
}

// TODO denne burde fjernes
export function settFiltervalg(filtervalg) {
    return (dispatch, getState) => {
        dispatch({ type: SETT_FILTERVALG, data: filtervalg });
        oppdaterPortefolje(getState, dispatch);
    };
}
