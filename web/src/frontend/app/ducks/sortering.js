import { DIRECTION } from './../utils/sortering';

// Actions
export const SORTERT_PA = 'veilarbportefoljeflatefs/sortering/SORTERT_PA';
export const RESET = 'veilarbportefoljeflatefs/sortering/SETUP';

const initialState = {
    property: null,
    direction: DIRECTION.NA
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SORTERT_PA:
            const { property } = action.data;

            let direction = DIRECTION.ASC;
            if (property === state.property) {
                direction = state.direction === DIRECTION.DESC ? DIRECTION.ASC : DIRECTION.DESC;
            }

            return { property, direction };
        case RESET:
            return { ...initialState };
        default:
            return state;
    }
}

// Action Creators
export function sortBy(property) {
    return { type: SORTERT_PA, data: { property } };
}

export function resetSort() {
    return { type: RESET };
}
