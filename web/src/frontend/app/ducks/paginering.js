
// Actions
export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';

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
        default:
            return state;
    }
}

// Action Creators
export function pagineringSetup({ side, antall, sideStorrelse }) {
    return { type: SETUP, data: { side, antall, sideStorrelse } };
}
