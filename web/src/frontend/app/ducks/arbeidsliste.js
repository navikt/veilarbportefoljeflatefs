import { STATUS, doThenDispatch } from './utils';
import { leggTilArbeidsliste } from '../middleware/api';

// Actions
const LAGRE_ARBEIDSLISTE_OK = 'veilarbportefolje/lagre_arbeidsliste/OK';
const LAGRE_ARBEIDSLISTE_FEILET = 'veilarbportefolje/lagre_arbeidsliste/FEILET';
const LAGRE_ARBEIDSLISTE_PENDING = 'veilarbportefolje/lagre_arbeidsliste/PENDING';

const initialState = {
    data: {
        veilederId: undefined,
        liste: []
    }
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LAGRE_ARBEIDSLISTE_PENDING:
            return { ...state, status: STATUS.PENDING };
        case LAGRE_ARBEIDSLISTE_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case LAGRE_ARBEIDSLISTE_OK:
            return { ...state, status: STATUS.OK, data: action.data.liste, veilederId: action.data.veilederId };
        default:
            return state;
    }
}

// Action Creators
export function lagreArbeidsliste(arbeidsliste) {
    return doThenDispatch(() => leggTilArbeidsliste(arbeidsliste), {
        OK: LAGRE_ARBEIDSLISTE_OK,
        FEILET: LAGRE_ARBEIDSLISTE_FEILET,
        PENDING: LAGRE_ARBEIDSLISTE_PENDING
    });
}

