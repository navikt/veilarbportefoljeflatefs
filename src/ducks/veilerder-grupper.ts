import { hentEnhetsVeilederGrupper } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';
import { VeilederGruppe } from '../model-interfaces';

// Actions
export const OK = 'veiledergrupper/OK';
export const FEILET = 'veiledergrupper/FEILET';
export const PENDING = 'veiledergrupper/PENDING';

export interface VeiledereGruppeState {
    status: string;
    data: VeilederGruppe[];
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
};

//  Reducer
export default function reducer(state: VeiledereGruppeState = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
        default:
            return state;
    }
}

// Action Creators
export function hentVeilederGrupperForEnhet(enhetId) {
    return doThenDispatch(() => hentEnhetsVeilederGrupper(enhetId), {
        OK,
        FEILET,
        PENDING
    });
}
