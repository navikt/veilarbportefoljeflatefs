import * as Api from '../middleware/api';
import { STATUS, doThenDispatch } from './utils';

// Actions
export const OK = 'veilarbportefoljeflatefs/diagram/OK';
export const FEILET = 'veilarbportefoljeflatefs/diagram/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/diagram/PENDING';

const initalState = {
    status: STATUS.NOT_STARTED,
    data: { }
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
export function hentDiagramdata(enhet, filtervalg, ident) {
    return doThenDispatch(() => Api.hentDiagramdata(enhet, filtervalg, ident), {
        OK,
        FEILET,
        PENDING
    });
}
