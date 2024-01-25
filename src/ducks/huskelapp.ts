import {doThenDispatch, STATUS} from './utils';
import {lagreHuskelapp} from '../middleware/api';

// Actions
const HUSKELAPP_LAGRE_OK = 'veilarbportefolje/lagre_huskelapp/OK';
const HUSKELAPP_LAGRE_FEILET = 'veilarbportefolje/lagre_huskelapp/FEILET';
const HUSKELAPP_LAGRE_PENDING = 'veilarbportefolje/lagre_huskelapp/PENDING';

//const HUSKELAPP_SLETT_OK = 'veilarbportefolje/slett_arbeidsliste/OK';
//const HUSKELAPP_SLETT_FEILET = 'veilarbportefolje/slett_arbeidsliste/FEILET';
//const HUSKELAPP_SLETT_PENDING = 'veilarbportefolje/slett_arbeidsliste/PENDING';

//const HUSKELAPP_REDIGER_OK = 'veilarbportefolje/rediger_arbeidsliste/OK';
//const HUSKELAPP_REDIGER_FEILET = 'veilarbportefolje/rediger_arbeidsliste/FEILET';
//const HUSKELAPP_REDIGER_PENDING = 'veilarbportefolje/rediger_arbeidsliste/PENDING';

export interface LagreHuskelapp {
    enhetId: string;
    brukerFnr: string;
    frist: string; //2024-01-30
    kommentar: string | null;
}

export interface EndreHuskelapp {
    huskelappId: string;
    brukerFnr: string;
    enhetId: string;
    frist: string | null; //2024-01-30
    kommentar: string | null;
}

const initialState = {
    data: {}
};

export default function huskelappReducer(state = initialState, action) {
    switch (action.type) {
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
