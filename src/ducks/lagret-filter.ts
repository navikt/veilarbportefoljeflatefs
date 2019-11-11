import { hentEnhetsFilterGrupper } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';
import { FiltervalgModell } from '../model-interfaces';

// Actions
export const OK = 'veiledergrupper/OK';
export const FEILET = 'veiledergrupper/FEILET';
export const PENDING = 'veiledergrupper/PENDING';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell
}


export interface LagretFilterState {
    status: string;
    data: LagretFilter[];
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
};

//  Reducer
export default function reducer(state: LagretFilterState = initialState, action) {
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
export function hentLagretFilterForEnhet(enhetId) {
    return doThenDispatch(() => hentEnhetsFilterGrupper(enhetId), {
        OK,
        FEILET,
        PENDING
    });
}
