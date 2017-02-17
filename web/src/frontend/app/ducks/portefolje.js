import * as Api from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';

// Actions
const OK = 'veilarbportefolje/enhetsportefolje/OK';
const FEILET = 'veilarbportefolje/enhetsportefolje/FEILET';
const PENDING = 'veilarbportefolje/enhetsportefolje/PENDING';
const SETT_SORTERINGSREKKEFOLGE = 'veilarbportefolje/enhetsportefolje/SETT_SORTERINGSREKKEFOLGE';

// Reducer

const initialState = {
    status: STATUS.NOT_STARTED,
    data: {
        brukere: [],
        antallTotalt: 0,
        antallReturnert: 0,
        fraIndex: 0
    },
    sorteringsrekkefolge: 'ikke_satt'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case SETT_SORTERINGSREKKEFOLGE: {
            return { ...state, sorteringsrekkefolge: action.sorteringsrekkefolge };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentPortefoljeForEnhet(enhet, rekkefolge, fra = 0, antall = 20) {
    return doThenDispatch(() => Api.hentEnhetsPortefolje(enhet, rekkefolge, fra, antall), {
        OK,
        FEILET,
        PENDING
    });
}

export function settSorterRekkefolge(rekkefolge) {
    return dispatch => dispatch({
        type: SETT_SORTERINGSREKKEFOLGE,
        sorteringsrekkefolge: rekkefolge

    });
}
