import { hentEnheter } from './../middleware/api';
import { STATUS } from './utils';


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
        // case PENDING:
        //     return { ...state, status: STATUS.PENDING };
        // case FEILET:
        //     return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data, valgtEnhet: action.data[0] };
        case VELG_ENHET:
            return { ...state, valgtEnhet: action.valgtEnhet };
        default:
            return state;
    }
    // return state;
}

// Action Creators
export function hentEnheterForSaksbehandler(id) {
    // return doThenDispatch(() => hentEnheterForSaksbehandler(id), {
    //     OK,
    //     FEILET,
    //     PENDING
    // });
    return {
        type: OK,
        data: hentEnheter(id)
    };
}

export function velgEnhetForSaksbehandler(valgtEnhet) {
    return {
        type: VELG_ENHET,
        valgtEnhet: valgtEnhet
    };
}
