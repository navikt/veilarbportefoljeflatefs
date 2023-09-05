// Actions
import {doThenDispatch, STATUS} from './utils';
import {hentBrukerIKontekst} from '../middleware/api';
import {Action} from 'redux';

export const OK = 'modiacontextholder/api/context/OK';
export const FEILET = 'modiacontextholder/api/context/FEILET';
export const PENDING = 'modiacontextholder/api/context/PENDING';

export interface BrukerIKontekstState {
    status: any;
    data: string | null;
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: null
};

//  Reducer
export default function brukerIKontekstReducer(
    state: BrukerIKontekstState = initialState,
    action: Action & {data: string | null}
) {
    switch (action.type) {
        case PENDING:
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR};
        case OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

// Action Creators
export function hentBrukerIKontekstActionCreator() {
    return doThenDispatch(() => hentBrukerIKontekst(), {
        OK,
        FEILET,
        PENDING
    });
}
