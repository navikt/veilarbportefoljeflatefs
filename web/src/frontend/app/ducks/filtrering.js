// Actions
export const VALGT_NYE_BRUKERE = 'VALGT_NYE_BRUKERE';
export const AVVALGT_NYE_BRUKERE = 'AVVALGT_NYE_BRUKERE';
export const VALGT_INAKTIVE_BRUKERE = 'VALGT_INAKTIVE_BRUKERE';
export const AVVALGT_INAKTIVE_BRUKERE = 'AVVALGT_INAKTIVE_BRUKERE';

const initialState = {
    filtervalg: {
        nye_brukere: false,
        inaktive_brukere: false
    }
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case VALGT_NYE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nye_brukere: true,
                    inaktive_brukere: state.filtervalg.inaktive_brukere
                }
            };
        case AVVALGT_NYE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nye_brukere: false,
                    inaktive_brukere: state.filtervalg.inaktive_brukere
                }
            };
        case VALGT_INAKTIVE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nye_brukere: state.filtervalg.nye_brukere,
                    inaktive_brukere: true
                }
            };
        case AVVALGT_INAKTIVE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nye_brukere: state.filtervalg.nye_brukere,
                    inaktive_brukere: false
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function endreFiltervalg(filterId, filtervalg) {
    if (filterId === 'checkbox-filtrering-oversikt-nye-brukere') {
        return { type: filtervalg ? VALGT_NYE_BRUKERE : AVVALGT_NYE_BRUKERE };
    } else if (filterId === 'checkbox-filtrering-oversikt-inaktive-brukere') {
        return { type: filtervalg ? VALGT_INAKTIVE_BRUKERE : AVVALGT_INAKTIVE_BRUKERE };
    }
    return {};
}
