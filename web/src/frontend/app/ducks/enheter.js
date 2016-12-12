// import { hentStillingsdetaljer } from './../middleware/api';
// import { STATUS, doThenDispatch } from './utils';


// Actions
//export const OK = 'xmlstillingadmin/stillingsdetaljer/OK';
//export const FEILET = 'xmlstillingadmin/stillingsdetaljer/FEILET';
//export const PENDING = 'xmlstillingadmin/stillingsdetaljer/PENDING';

const initialState = {
    data: {}
};

//  Reducer
export default function reducer(state = initialState, action) {
    /*switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
        default:
            return state;
    }*/
    return state;
}

// Action Creators
/*export function hentDetaljerOmStilling(id) {
    return doThenDispatch(() => hentStillingsdetaljer(id), {
        OK,
        FEILET,
        PENDING
    });
}*/
