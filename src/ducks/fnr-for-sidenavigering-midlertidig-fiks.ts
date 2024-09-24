import {Action} from 'redux';

export enum FnrForMidlertidigFiksSidenavigeringActionType {
    SETT_FNR_MIDLERTIDIG_FIKS_SIDENAVIGERING = 'midlertidigFiksSidenavigering/SETT_FNR_MIDLERTIDIG_FIKS_SIDENAVIGERING'
}

export interface FnrForMidlertidigFiksSidenavigeringState {
    fnr: string | null;
}

const initialState = {
    fnr: null
};

export const fnrForSidenavigeringMidlertidigFiksReducer = (
    state: FnrForMidlertidigFiksSidenavigeringState = initialState,
    action: Action<FnrForMidlertidigFiksSidenavigeringActionType> & FnrForMidlertidigFiksSidenavigeringState
): FnrForMidlertidigFiksSidenavigeringState => {
    switch (action.type) {
        case FnrForMidlertidigFiksSidenavigeringActionType.SETT_FNR_MIDLERTIDIG_FIKS_SIDENAVIGERING:
            return {...state, fnr: action.fnr};
        default:
            return state;
    }
};
