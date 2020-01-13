// Actions
import { DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import { MinoversiktVisning, TABELLVISNING } from '../minoversikt/minoversikt-konstanter';

export const SETUP = 'veilarbportefoljeflatefs/paginering/SETUP';
export const SETT_VISNINGSMODUS = 'veilarbportefoljeflatefs/paginering/settvisningsmodus';

interface PagineringState {
    side: number;
    seAlle: boolean;
    sideStorrelse: number;
    visningsmodus: string;
}

const initialState: PagineringState = {
    side: 1,
    seAlle: false,
    sideStorrelse: DEFAULT_PAGINERING_STORRELSE,
    visningsmodus: TABELLVISNING
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETUP:
            return {...state, ...action.data};
        case SETT_VISNINGSMODUS:
            return {
                ...state,
                visningsmodus: action.visningsmodus
            };
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
export function pagineringSetup(data: PageringOppdatering) {
    return {type: SETUP, data};
}

export function settVisningsmodus(visningsmodus: MinoversiktVisning) {
    return {
        type: SETT_VISNINGSMODUS,
        visningsmodus
    };
}
