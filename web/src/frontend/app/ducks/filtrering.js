// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';

//  Reducer
const initialState = {
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
    return {
        type: ENDRE_FILTER,
        data: {
            filternavn: filterId,
            filterverdi: filtervalg
        }
    };
}

// TODO denne burde fjernes
export function settFiltervalg(filtervalg) {
    return { type: SETT_FILTERVALG, data: filtervalg };
}
