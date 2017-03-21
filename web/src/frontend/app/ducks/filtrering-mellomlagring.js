// Actions
export const VALGT_ALDER = 'filtrering-mellomlagring/VALGT_ALDER';
export const VALGT_KJONN = 'filtrering-mellomlagring/VALGT_KJONN';
export const VALGT_FODSELSDAG = 'filtrering-mellomlagring/VALGT_FODSELSDAG';
export const VALGT_INNSATSGRUPPE = 'filtrering-mellomlagring/VALGT_INNSATSGRUPPE';

//  Reducer
const initialState = {
    filtervalg: {
        alder: [],
        kjonn: [],
        fodselsdagIMnd: [],
        innsatsgruppe: []
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
        case VALGT_INNSATSGRUPPE:
            return { ...state,
                filtervalg: {
                    ...state.filtervalg,
                    innsatsgruppe: action.innsatsgruppe
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
    } else if (filterId === 'innsatsgruppe') {
        return { type: VALGT_INNSATSGRUPPE, innsatsgruppe: filtervalg };
    }
}
