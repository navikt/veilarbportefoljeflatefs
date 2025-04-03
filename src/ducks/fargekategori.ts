import * as Api from '../middleware/api';
import {doThenDispatch, STATUS} from './utils';

// Actions
export const FARGEKATEGORI_OPPDATER_OK = 'veilarbportefolje/oppdater_fargekategori/OK';
const FARGEKATEGORI_OPPDATER_FEILET = 'veilarbportefolje/oppdater_fargekategori/FEILET';
const FARGEKATEGORI_OPPDATER_PENDING = 'veilarbportefolje/oppdater_fargekategori/PENDING';
const FARGEKATEGORI_RESET = 'veilarbportefolje/reset_fargekategori/RESET';

const initialState = {
    data: {}
};

//  Reducer
export function fargekategoriReducer(state = initialState, action) {
    switch (action.type) {
        case FARGEKATEGORI_OPPDATER_OK:
        case FARGEKATEGORI_RESET: {
            return {...state, status: STATUS.OK, data: action.data};
        }

        case FARGEKATEGORI_OPPDATER_PENDING: {
            return {...state, status: STATUS.PENDING};
        }
        case FARGEKATEGORI_OPPDATER_FEILET: {
            return {...state, status: STATUS.ERROR, data: action.data};
        }

        default:
            return state;
    }
}

// Action Creators

export const oppdaterFargekategoriAction = fargekategori => {
    return doThenDispatch(() => Api.oppdaterFargekategori(fargekategori), {
        OK: FARGEKATEGORI_OPPDATER_OK,
        FEILET: FARGEKATEGORI_OPPDATER_FEILET,
        PENDING: FARGEKATEGORI_OPPDATER_PENDING
    });
};

export const resetFargekategoriStateAction = () => {
    return {
        type: FARGEKATEGORI_RESET,
        data: {}
    };
};
