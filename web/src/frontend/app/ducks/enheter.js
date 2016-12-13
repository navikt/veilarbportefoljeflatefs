import { hentEnheter } from './../middleware/api';
import { STATUS } from './utils';


// Actions
export const OK = 'veilarbportefolje/enheter/OK';
export const FEILET = 'veilarbportefolje/enheter/FEILET';
export const PENDING = 'veilarbportefolje/enheter/PENDING';

const initialState = {
    data: []
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case PENDING:
        //     return { ...state, status: STATUS.PENDING };
        // case FEILET:
        //     return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
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
