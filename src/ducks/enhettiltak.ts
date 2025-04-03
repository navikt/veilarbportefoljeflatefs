import * as Api from './../middleware/api';
import {doThenDispatch, STATUS} from './utils';
import {OrNothing} from '../utils/types/types';

// Actions
export const OK = 'veilarbportefoljeflatefs/enhettiltak/OK';
export const FEILET = 'veilarbportefoljeflatefs/enhettiltak/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/enhettiltak/PENDING';

export type Tiltak = {[key: string]: string};

export interface EnhettiltakState {
    data: {
        tiltak: OrNothing<Tiltak>;
    };
    status?: string;
}

const initalState: EnhettiltakState = {
    data: {
        tiltak: null
    },
    status: STATUS.NOT_STARTED
};

// Reducer
export function enhetTiltakReducer(state: EnhettiltakState = initalState, action) {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

// Action Creators
export function hentEnhetTiltak(enhet) {
    return doThenDispatch(() => Api.hentEnhetTiltak(enhet), {
        OK,
        FEILET,
        PENDING
    });
}
