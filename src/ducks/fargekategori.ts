import {doThenDispatch, STATUS} from './utils';
import * as Api from '../middleware/api';

// Actions
export const FARGEKATEGORI_REDIGER_OK = 'veilarbportefolje/oppdater_fargekategori/OK';
const FARGEKATEGORI_REDIGER_FEILET = 'veilarbportefolje/oppdater_fargekategori/FEILET';
const FARGEKATEGORI_REDIGER_PENDING = 'veilarbportefolje/oppdater_fargekategori/PENDING';

const initialState = {
    data: {}
};

//  Reducer
export default function fargekategoriReducer(state = initialState, action) {
    switch (action.type) {
        case FARGEKATEGORI_REDIGER_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }

        case FARGEKATEGORI_REDIGER_PENDING: {
            return {...state, status: STATUS.PENDING};
        }
        case FARGEKATEGORI_REDIGER_FEILET: {
            return {...state, status: STATUS.ERROR};
        }

        default:
            return state;
    }
}

// Action Creators

export function lagreFargekategoriAction(fargekategori) {
    return doThenDispatch(() => Api.oppdaterFargekategori(fargekategori), {
        OK: FARGEKATEGORI_REDIGER_OK,
        FEILET: FARGEKATEGORI_REDIGER_FEILET,
        PENDING: FARGEKATEGORI_REDIGER_PENDING
    });
}
