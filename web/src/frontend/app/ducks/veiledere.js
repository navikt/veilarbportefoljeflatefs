import { hentEnhetsVeiledere } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';

// Actions
export const OK = 'veilarbveileder/veiledere/OK';
export const FEILET = 'veilarbveileder/veiledere/FEILET';
export const PENDING = 'veilarbveileder/veiledere/PENDING';

const initialState = {
    status: STATUS.NOT_STARTED,
    data: {
        veilederListe: [],
        enhet: {}
    }
};

//  Reducer
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
export function hentVeiledereForEnhet(enhetId) {
    return doThenDispatch(() => hentEnhetsVeiledere(enhetId), {
        OK,
        FEILET,
        PENDING
    });
}
