
// Actions
import { DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import { ToolbarPosisjon } from '../components/toolbar/toolbar';

export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';

interface PagineringState {
    side: number;
    seAlle: boolean;
    sideStorrelse: number;
}

const initialState: PagineringState = {
    side: 1,
    seAlle: false,
    sideStorrelse: DEFAULT_PAGINERING_STORRELSE
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETUP:
            return { ...state, ...action.data };
        default:
            return state;
    }
}

export interface PageringOppdatering {
    side: number;
    seAlle?: boolean;
    sideStorrelse?: number;
}

// Action Creators
export function pagineringSetup(data: PageringOppdatering, toolbarPosisjon?: ToolbarPosisjon) {
    return { type: SETUP, data, toolbarPosisjon };
}
