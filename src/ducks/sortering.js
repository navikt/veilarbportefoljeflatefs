/* eslint-disable no-case-declarations */
import {RETNING} from './../utils/sortering';

// Actions
export const SORTERT_PA = 'veilarbportefoljeflatefs/sortering/SORTERT_PA';
export const RESET = 'veilarbportefoljeflatefs/sortering/SETUP';

const initialState = {
    property: null,
    direction: RETNING.NA
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SORTERT_PA:
            const {property} = action.data;

            let direction = RETNING.STIGENDE;
            if (property === state.property) {
                direction = state.direction === RETNING.SYNKENDE ? RETNING.STIGENDE : RETNING.SYNKENDE;
            }

            return {property, direction};
        case RESET:
            return {...initialState};
        default:
            return state;
    }
}

// Action Creators
export function sortBy(property) {
    return {type: SORTERT_PA, data: {property}};
}

export function resetSort() {
    return {type: RESET};
}
