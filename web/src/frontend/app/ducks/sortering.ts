import { DIRECTION } from '../utils/sortering';

// Actions
export const SORTERT_PA = 'veilarbportefoljeflatefs/sortering/SORTERT_PA';

export interface SorteringState {
    property: string;
    direction: DIRECTION
}

const initialState: SorteringState = {
    property: '',
    direction: DIRECTION.NA
};

// Reducer
export default function reducer(state: SorteringState = initialState, action) {
    switch (action.type) {
        case SORTERT_PA:
            const property  = action.property;

            let direction = DIRECTION.ASC;
            if (property === state.property) {
                direction = state.direction === DIRECTION.DESC ? DIRECTION.ASC : DIRECTION.DESC;
            }

            return { property, direction };
        default:
            return state;
    }
}

// Action Creators
export function sortBy(property) {
    return {
        type: SORTERT_PA,
        property
    };
}
