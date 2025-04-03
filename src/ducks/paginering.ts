// Actions
import {DEFAULT_PAGINERING_STORRELSE} from '../konstanter';

export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';

export interface PagineringState {
    side: number;
    sidestorrelse: number;
}

const initialState: PagineringState = {
    side: 1,
    sidestorrelse: DEFAULT_PAGINERING_STORRELSE
};

// Reducer
export function pagineringReducer(state = initialState, action) {
    switch (action.type) {
        case SETUP:
            return {...state, ...action.data};
        default:
            return state;
    }
}

export interface PageringOppdatering {
    side: number;
    sidestorrelse?: number;
}

// Action Creators
export function pagineringSetup(data: PageringOppdatering) {
    return {type: SETUP, data};
}
