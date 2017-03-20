// Actions
export const VALGT_ALDER = 'VALGT_ALDER';
export const VALGT_KJONN = 'VALGT_KJONN';
export const VALGT_FODSELSDAG = 'VALGT_FODSELSDAG';

//  Reducer
const initialState = {
    filtervalg: {
        alder: [],
        kjonn: 'ikke definert',
        fodselsdagIMnd: []
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case VALGT_ALDER:
            return { ...state,
                filtervalg: {
                    ...state.filtervalg,
                    alder: action.alder
                }
            };
        case VALGT_KJONN:
            return { ...state,
                filtervalg: {
                    ...state.filtervalg,
                    kjonn: action.kjonn
                }
            };
        case VALGT_FODSELSDAG:
            return { ...state,
                filtervalg: {
                    ...state.filtervalg,
                    fodselsdagIMnd: action.fodselsdagIMnd
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function endreFiltervalgMellomlagring(filterId, filtervalg) { // eslint-disable-line consistent-return
    if (filterId === 'alder') {
        return { type: VALGT_ALDER, alder: filtervalg };
    } else if (filterId === 'kjonn') {
        return { type: VALGT_KJONN, kjonn: filtervalg };
    } else if (filterId === 'fodselsdagIMnd') {
        return { type: VALGT_FODSELSDAG, fodselsdagIMnd: filtervalg };
    }
}
