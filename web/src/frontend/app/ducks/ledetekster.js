import * as Api from '../middleware/api';
import { STATUS, doThenDispatch } from './utils';

// Actions
export const OK = 'veilarbportefoljeflatefs/ledetekster/OK';
export const FEILET = 'veilarbportefoljeflatefs/ledetekster/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/ledetekster/PENDING';

const initalState = {
    status: STATUS.NOT_STARTED,
    data: { nb: { spinner: 'spinner' } }
};

// Reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case PENDING:
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
export function hentLedetekster() {
    return doThenDispatch(() => Api.hentLedetekster(), {
        OK,
        FEILET,
        PENDING
    });
}
