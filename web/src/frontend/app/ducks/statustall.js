import * as Api from './../middleware/api';
import { doThenDispatch, STATUS } from './utils';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustall/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustall/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustall/PENDING';

const initalState = {
    status: STATUS.NOT_STARTED,
    data: {
        totalt: 0,
        nyeBrukere: 0,
        inaktiveBrukere: 0,
        venterPaSvarFraNAV: 0,
        venterPaSvarFraBruker: 0,
        utlopteAktiviteter: 0,
        ikkeIavtaltAktivitet: 0,
        iavtaltAktivitet: 0
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
export function hentStatusTall(enhet, veileder) {
    if (veileder === undefined) {
        return doThenDispatch(() => Api.hentStatusTall(enhet), {
            OK,
            FEILET,
            PENDING
        });
    }
    return doThenDispatch(() => Api.hentStatusTallForveileder(enhet, veileder), {
        OK,
        FEILET,
        PENDING
    });
}
