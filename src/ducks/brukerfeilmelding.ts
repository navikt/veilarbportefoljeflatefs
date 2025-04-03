import {Action, Dispatch} from 'redux';
import {DataAction} from './types';

type BrukerfeilDataAction = DataAction<BrukerfeilAction, BrukerfeilState>;

// Actions
enum BrukerfeilAction {
    SETT_BRUKERFEILSTATE = 'SETT_BRUKERFEILSTATE',
    FJERN_BRUKERFEILSTATE = 'FJERN_BRUKERFEILSTATE'
}

export interface BrukerfeilState {
    status: boolean;
    message: string;
}

const initialBrukerfeilState: BrukerfeilState = {
    status: false,
    message: ''
};
const feilBrukerfeilState: BrukerfeilState = {
    status: true,
    message: 'Du må velge minst én bruker'
};

// Reducer
export function brukerfeilReducer(state = initialBrukerfeilState, action: BrukerfeilDataAction): BrukerfeilState {
    switch (action.type) {
        case BrukerfeilAction.SETT_BRUKERFEILSTATE:
            action.data = feilBrukerfeilState;
            return {...state, ...action.data};
        case BrukerfeilAction.FJERN_BRUKERFEILSTATE:
            action.data = initialBrukerfeilState;
            return {...state, ...action.data};
        default:
            return state;
    }
}

export function settBrukerfeil(action) {
    return {
        type: action
    };
}

export function oppdaterBrukerfeil() {
    return (dispatch: Dispatch<Action>) => {
        dispatch(settBrukerfeil(BrukerfeilAction.SETT_BRUKERFEILSTATE));
    };
}

export function nullstillBrukerfeil() {
    return (dispatch: Dispatch<Action>) => {
        dispatch(settBrukerfeil(BrukerfeilAction.FJERN_BRUKERFEILSTATE));
    };
}
