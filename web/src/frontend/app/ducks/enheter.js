import { hentEnheter } from './../middleware/api';
import { STATUS, doThenDispatch} from './utils';


// Actions
export const OK = 'veilarbportefolje/enheter/OK';
export const FEILET = 'veilarbportefolje/enheter/FEILET';
export const PENDING = 'veilarbportefolje/enheter/PENDING';

export const VELG_ENHET = 'VELG_ENHET';

const initialState = {
    data: [],
    valgtEnhet: undefined
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data, valgtEnhet: action.data[0] };
        case VELG_ENHET:
            return { ...state, valgtEnhet: action.valgtEnhet };
        default:
            return state;
    }
}

// Action Creators
export function hentEnheterForSaksbehandler(id) {
    return doThenDispatch(() => hentEnheter(id), {
        OK,
        FEILET,
        PENDING
    });
}

export function velgEnhetForSaksbehandler(valgtEnhet) {
    return {
        type: VELG_ENHET,
        valgtEnhet
    };
}
