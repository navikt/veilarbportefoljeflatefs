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
export default function reducer(state = initialBrukerfeilState, action: BrukerfeilDataAction): BrukerfeilState {
    switch (action.type) {
        case BrukerfeilAction.SETT_BRUKERFEILSTATE:
            return {...state, ...action.data};
        case BrukerfeilAction.FJERN_BRUKERFEILSTATE:
            return {...state, ...action.data};
        default:
            return state;
    }
}

export function settBrukerfeil(feilmelding) {
    return {
        type: BrukerfeilAction.SETT_BRUKERFEILSTATE,
        feilmelding: feilmelding
    };
}

export function oppdaterBrukerfeil() {
    return (dispatch: Dispatch<Action>) => {
        dispatch(settBrukerfeil(feilBrukerfeilState));
    };
}

export function nullstillBrukerfeil() {
    return (dispatch: Dispatch<Action>) => {
        dispatch(settBrukerfeil(initialBrukerfeilState));
    };
}
