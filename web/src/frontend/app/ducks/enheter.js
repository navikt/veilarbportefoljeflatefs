import { hentVeiledersEnheter } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';
import { leggEnhetIUrl } from '../utils/utils';

// Actions
const OK = 'veilarbportefolje/enheter/OK';
const FEILET = 'veilarbportefolje/enheter/FEILET';
const PENDING = 'veilarbportefolje/enheter/PENDING';
const VELG_ENHET = 'VELG_ENHET';

const initialState = {
    data: [],
    valgtEnhet: {
        status: STATUS.NOT_STARTED,
        enhet: undefined
    },
    ident: undefined
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data.enhetliste, ident: action.data.ident };
        case VELG_ENHET:
            return {
                ...state,
                valgtEnhet: {
                    enhet: action.valgtEnhet,
                    status: STATUS.OK
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function hentEnheterForVeileder() {
    return doThenDispatch(() => hentVeiledersEnheter(), {
        OK,
        FEILET,
        PENDING
    });
}

export function velgEnhetForVeileder(valgtEnhet) {
    leggEnhetIUrl(valgtEnhet.enhetId ? valgtEnhet.enhetId : valgtEnhet);
    return {
        type: VELG_ENHET,
        valgtEnhet
    };
}

