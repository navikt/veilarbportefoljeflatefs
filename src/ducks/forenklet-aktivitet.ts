export const FORENKLET_AKTIVITET = 'veilarbportefolje/portefolje/FORENKLET_AKTIVITET';
export const AVANSERT_AKTIVITET = 'veilarbportefolje/portefolje/AVANSERT_AKTIVITET';
// Actions
export interface ForenkletAktivitetState {
    erForenkletAktivitet: boolean;
}

const initialState = {
    erForenkletAktivitet: true
};

//  Reducer
export default function reducer(state: ForenkletAktivitetState = initialState, action) {
    switch (action.type) {
        case FORENKLET_AKTIVITET: {
            return {
                ...state,
                erForenkletAktivitet: true
            };
        }
        case AVANSERT_AKTIVITET: {
            return {
                ...state,
                erForenkletAktivitet: false
            };
        }
        default:
            return state;
    }
}
