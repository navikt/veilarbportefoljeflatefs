import { STATUS, doThenDispatch } from './utils';
import { httpArbeidsliste } from '../middleware/api';
import {ArbeidslisteDataModell} from "../model-interfaces";

// Actions
export const ARBEIDSLISTE_LAGRE_OK = 'veilarbportefolje/lagre_arbeidsliste/OK';
const ARBEIDSLISTE_LAGRE_FEILET = 'veilarbportefolje/lagre_arbeidsliste/FEILET';
const ARBEIDSLISTE_LAGRE_PENDING = 'veilarbportefolje/lagre_arbeidsliste/PENDING';

export const ARBEIDSLISTE_SLETT_OK = 'veilarbportefolje/slett_arbeidsliste/OK';
const ARBEIDSLISTE_SLETT_FEILET = 'veilarbportefolje/slett_arbeidsliste/FEILET';
const ARBEIDSLISTE_SLETT_PENDING = 'veilarbportefolje/slett_arbeidsliste/PENDING';

export const ARBEIDSLISTE_REDIGER_OK = 'veilarbportefolje/rediger_arbeidsliste/OK';
const ARBEIDSLISTE_REDIGER_FEILET = 'veilarbportefolje/rediger_arbeidsliste/FEILET';
const ARBEIDSLISTE_REDIGER_PENDING = 'veilarbportefolje/rediger_arbeidsliste/PENDING';

const initialState = {
    data: {}
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ARBEIDSLISTE_LAGRE_PENDING:
            return { ...state, status: STATUS.PENDING };
        case ARBEIDSLISTE_LAGRE_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case ARBEIDSLISTE_LAGRE_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case ARBEIDSLISTE_SLETT_PENDING:
            return { ...state, status: STATUS.PENDING };
        case ARBEIDSLISTE_SLETT_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case ARBEIDSLISTE_SLETT_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case ARBEIDSLISTE_REDIGER_PENDING:
            return { ...state, status: STATUS.PENDING };
        case ARBEIDSLISTE_REDIGER_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case ARBEIDSLISTE_REDIGER_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        default:
            return state;
    }
}





















export function lagreArbeidsliste(arbeidsliste, brukere ) {
    const liste = arbeidsliste.map((elem, index) => ({
        fnr: brukere[index].fnr,
        overskrift: elem.overskrift,
        kommentar: elem.kommentar,
        frist: elem.frist
    }));
    return dispatch =>
        dispatch(postArbeidsliste(liste))
            .then(res => )

}


// Action Creators
export function postArbeidsliste(arbeidsliste) {
    return doThenDispatch(() => httpArbeidsliste(arbeidsliste, 'post'), {
        OK: ARBEIDSLISTE_LAGRE_OK,
        FEILET: ARBEIDSLISTE_LAGRE_FEILET,
        PENDING: ARBEIDSLISTE_LAGRE_PENDING
    });
}

export function slettArbeidsliste(arbeidsliste) {
    return doThenDispatch(() => httpArbeidsliste(arbeidsliste, 'post', 'delete'), {
        OK: ARBEIDSLISTE_SLETT_OK,
        FEILET: ARBEIDSLISTE_SLETT_FEILET,
        PENDING: ARBEIDSLISTE_SLETT_PENDING
    });
}

export function redigerArbeidsliste(arbeidsliste, fnr) {
    return doThenDispatch(() => httpArbeidsliste(arbeidsliste, 'put', fnr), {
        OK: ARBEIDSLISTE_REDIGER_OK,
        FEILET: ARBEIDSLISTE_REDIGER_FEILET,
        PENDING: ARBEIDSLISTE_REDIGER_PENDING
    });
}

