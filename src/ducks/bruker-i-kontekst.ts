// Actions
import {Dispatch} from 'redux';
import * as Api from '../middleware/api';
import {STATUS} from './utils';
import {DataAction} from './types';

enum BrukerIKontekstActionType {
    SETT_BRUKER = 'brukerIKontekst/SETT_BRUKER',
    FJERN_BRUKER = 'brukerIKontekst/FJERN_BRUKER'
}

type BrukerIKontekst = string | null;
type BrukerIKontekstDataAction = DataAction<BrukerIKontekstActionType, BrukerIKontekst>;

export interface BrukerIKontekstState {
    status: any;
    data: BrukerIKontekst;
}

const initialState: BrukerIKontekstState = {
    status: STATUS.NOT_STARTED,
    data: null
};

//  Reducer
export const brukerIKontekstReducer = (
    state: BrukerIKontekstState = initialState,
    action: DataAction<BrukerIKontekstActionType, BrukerIKontekst>
) => {
    switch (action.type) {
        case BrukerIKontekstActionType.SETT_BRUKER:
            return {...state, status: STATUS.OK, data: action.data ?? null};
        case BrukerIKontekstActionType.FJERN_BRUKER:
            return {...state, status: STATUS.OK, data: null};
        default:
            return state;
    }
};

// Action Creators
const settBruker = (data: BrukerIKontekst) => ({type: BrukerIKontekstActionType.SETT_BRUKER, data: data});
const fjernBruker = () => ({type: BrukerIKontekstActionType.SETT_BRUKER});

// Side effects
export const hentBrukerIKontekst = () => {
    return (dispatch: Dispatch<BrukerIKontekstDataAction>) =>
        Api.hentBrukerIKontekst().then(data => dispatch(settBruker(data)));
};

export const fjernBrukerIKontekst = () => {
    return (dispatch: Dispatch<BrukerIKontekstDataAction>) =>
        Api.fjernBrukerIKontekst().then(() => dispatch(fjernBruker()));
};
