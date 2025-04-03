import {doThenDispatch, STATUS} from './utils';
import {endreHuskelapp, lagreHuskelapp, slettHuskelapp} from '../middleware/api';

// Actions
export const HUSKELAPP_LAGRE_OK = 'veilarbportefolje/lagre_huskelapp/OK';
const HUSKELAPP_LAGRE_FEILET = 'veilarbportefolje/lagre_huskelapp/FEILET';
const HUSKELAPP_LAGRE_PENDING = 'veilarbportefolje/lagre_huskelapp/PENDING';

const HUSKELAPP_SLETT_OK = 'veilarbportefolje/slett_huskelapp/OK';
const HUSKELAPP_SLETT_FEILET = 'veilarbportefolje/slett_huskelapp/FEILET';
const HUSKELAPP_SLETT_PENDING = 'veilarbportefolje/slett_huskelapp/PENDING';

const HUSKELAPP_ENDRE_OK = 'veilarbportefolje/endre_huskelapp/OK';
const HUSKELAPP_ENDRE_FEILET = 'veilarbportefolje/endre_huskelapp/FEILET';
const HUSKELAPP_ENDRE_PENDING = 'veilarbportefolje/endre_huskelapp/PENDING';

export interface LagreHuskelapp {
    enhetId: string;
    brukerFnr: string;
    frist: string;
    kommentar: string | null;
}

export interface EndreHuskelapp extends LagreHuskelapp {
    huskelappId: string;
}

const initialState = {
    data: {}
};

export function huskelappReducer(state = initialState, action) {
    switch (action.type) {
        case HUSKELAPP_SLETT_PENDING:
        case HUSKELAPP_ENDRE_PENDING:
        case HUSKELAPP_LAGRE_PENDING:
            return {...state, status: STATUS.PENDING};
        case HUSKELAPP_SLETT_FEILET:
        case HUSKELAPP_ENDRE_FEILET:
        case HUSKELAPP_LAGRE_FEILET:
            return {...state, status: STATUS.ERROR};
        case HUSKELAPP_SLETT_OK:
        case HUSKELAPP_ENDRE_OK:
        case HUSKELAPP_LAGRE_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

//action creators
export function lagreHuskelappAction(huskelapp: LagreHuskelapp) {
    return doThenDispatch(() => lagreHuskelapp(huskelapp), {
        OK: HUSKELAPP_LAGRE_OK,
        FEILET: HUSKELAPP_LAGRE_FEILET,
        PENDING: HUSKELAPP_LAGRE_PENDING
    });
}

export function endreHuskelappAction(huskelapp: EndreHuskelapp) {
    return doThenDispatch(() => endreHuskelapp(huskelapp), {
        OK: HUSKELAPP_ENDRE_OK,
        FEILET: HUSKELAPP_ENDRE_FEILET,
        PENDING: HUSKELAPP_ENDRE_PENDING
    });
}

export function slettHuskelappAction(huskelappId: string) {
    return doThenDispatch(() => slettHuskelapp(huskelappId), {
        OK: HUSKELAPP_SLETT_OK,
        FEILET: HUSKELAPP_SLETT_FEILET,
        PENDING: HUSKELAPP_SLETT_PENDING
    });
}
