import * as Api from './../middleware/api';
import { doThenDispatch, STATUS } from './utils';

// Actions
export const OK = 'veilarbportefoljeflatefs/enhettiltak/OK';
export const FEILET = 'veilarbportefoljeflatefs/enhettiltak/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/enhettiltak/PENDING';

const initalState = {
    data: {
        tiltak: {}
    }
};

// Reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK: {
            return { ...state, status: STATUS.OK, data: action.data };
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
