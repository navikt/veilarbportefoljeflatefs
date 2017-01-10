import * as Api from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';

// Actions
const OK = 'veilarbportefolje/portefolje/OK';
const FEILET = 'veilarbportefolje/portefolje/FEILET';
const PENDING = 'veilarbportefolje/portefolje/PENDING';

// Reducer

const initialState = {
    status: STATUS.NOT_STARTED,
    data: {
        portefolje: {
            brukere: []
        }
    }
};

export default function reducer(state = initialState, action) {
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
export function hentPortefoljeForEnhet(enhet) {
    return doThenDispatch(() => Api.hentPortefolje(enhet), {
        OK,
        FEILET,
        PENDING
    });
}
