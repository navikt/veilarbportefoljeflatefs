import {doThenDispatch, STATUS} from './utils';
import * as Api from '../middleware/api';
import {FargekategoriModell, Status} from '../model-interfaces';

// Actions
export const FARGEKATEGORI_REDIGER_OK = 'veilarbportefolje/oppdater_fargekategori/OK';
export const FARGEKATEGORI_REDIGER_FEILET = 'veilarbportefolje/oppdater_fargekategori/FEILET';
export const FARGEKATEGORI_REDIGER_PENDING = 'veilarbportefolje/oppdater_fargekategori/PENDING';

const initialState: FargekategoriState = {
    data: {},
    status: Status.OK
};

export type FargekategoriState = {
    status: Status;
    data:
        | {
              fargekategori: FargekategoriModell;
              ok: string[];
              feilet: string[];
          }
        | {};
};

//  Reducer
export default function fargekategoriReducer(state: FargekategoriState = initialState, action) {
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
