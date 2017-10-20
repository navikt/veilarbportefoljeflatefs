
// Actions
export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';

export interface PagineringState {
    side: number;
    antall: number;
    sideStorrelse: number;
}

const initialState: PagineringState = {
    side: 1,
    antall: 1,
    sideStorrelse: 20
};

// Reducer
export default function reducer(state: PagineringState = initialState, action) {
    switch (action.type) {
        case SETUP:
            return { ...initialState, ...action.data };
        default:
            return state;
    }
}

// Action Creators
export function pagineringSetup({ side, antall, sideStorrelse }: PagineringState) {
    return {
        type: SETUP,
        data: { side, antall, sideStorrelse }
    };
}
