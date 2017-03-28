import { hentPortefoljeForEnhet } from './portefolje';

// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';

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
    ytelse: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ENDRE_FILTER:
            return {
                ...state,
                [action.data.filternavn]: action.data.filterverdi
            };
        case SETT_FILTERVALG:
            return { ...action.data };
        default:
            return state;
    }
}

// Action Creators
export function endreFiltervalg(filterId, filtervalg) {
    return (dispatch, getState) => {
        dispatch({
            type: ENDRE_FILTER,
            data: {
                filternavn: filterId,
                filterverdi: filtervalg
            }
        });

        const state = getState();
        const enhet = state.enheter.valgtEnhet.enhet.enhetId;
        const rekkefolge = state.portefolje.sorteringsrekkefolge;
        const fra = state.portefolje.data.fraIndex;
        const antall = state.paginering.sideStorrelse;
        const nyeFiltervalg = state.filtrering;
        hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, nyeFiltervalg)(dispatch);
    };
}

// TODO denne burde fjernes
export function settFiltervalg(filtervalg) {
    return (dispatch, getState) => {
        dispatch({ type: SETT_FILTERVALG, data: filtervalg });

        const state = getState();
        const enhet = state.enheter.valgtEnhet.enhet.enhetId;
        const rekkefolge = state.portefolje.sorteringsrekkefolge;
        const fra = state.portefolje.data.fraIndex;
        const antall = state.paginering.sideStorrelse;
        const nyeFiltervalg = state.filtrering;
        hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, nyeFiltervalg)(dispatch);
    };
}
