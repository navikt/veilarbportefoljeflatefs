// Actions
import {DEFAULT_PAGINERING_STORRELSE} from '../konstanter';

export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';

export interface PagineringState {
    side: number;
    seFlere: boolean;
    seFlereEnhetensOversikt: boolean;
    sideStorrelse: number;
}

const initialState: PagineringState = {
    side: 1,
    seFlere: false,
    seFlereEnhetensOversikt: false,
    sideStorrelse: DEFAULT_PAGINERING_STORRELSE
};

// Reducer
export default function pagineringReducer(state = initialState, action) {
    switch (action.type) {
        case SETUP:
            return {...state, ...action.data};
        default:
            return state;
    }
}

export interface PageringOppdatering {
    side: number;
    seFlere?: boolean;
    seFlereEnhetensOversikt?: boolean;
    sideStorrelse?: number;
}

// Action Creators
export function pagineringSetup(data: PageringOppdatering) {
    return {type: SETUP, data};
}
