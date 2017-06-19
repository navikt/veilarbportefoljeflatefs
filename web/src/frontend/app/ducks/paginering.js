
// Actions
export const GA_TIL_SIDE = 'veilarbportefoljeflatefs/paginering/GA_TIL_SIDE';
export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';
export const TOGGLE_SE_ALLE = 'veilarbportefoljeflatefs/paginering/TOGGLE_SE_ALLE';

const initialState = {
    side: 1,
    antall: 1,
    sideStorrelse: 20
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETUP:
            return { ...initialState, ...action.data };
        case GA_TIL_SIDE:
            return { ...state, side: action.data.side };
        case TOGGLE_SE_ALLE:
            return { ...state, seAlle: !state.seAlle };
        default:
            return state;
    }
}

// Action Creators
export function pagineringSetup({ side, antall, sideStorrelse }) {
    return { type: SETUP, data: { side, antall, sideStorrelse } };
}
