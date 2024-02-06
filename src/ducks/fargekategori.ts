import {doThenDispatch, STATUS} from './utils';
import {oppdaterFargekategori} from '../middleware/api';
import {FargekategoriDataModell, FargekategoriModell} from '../model-interfaces';
import {oppdaterFargekategoriState} from '../components/fargekategori/fargekategori-popover';
import {skjulModal} from './modal';

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
        case FARGEKATEGORI_REDIGER_PENDING:
            return {...state, status: STATUS.PENDING};
        case FARGEKATEGORI_REDIGER_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case FARGEKATEGORI_REDIGER_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

// Action Creators

export function oppdaterFargekategoriAction(data: FargekategoriDataModell) {
    // eslint-disable-next-line
    console.log('I oppdaterFargekategoriAction i fargekategori.ts', data.fargekategoriVerdi, data.fnr);
    return dispatch =>
        lagreFargekategoriAction(
            data.fargekategoriVerdi,
            data.fnr
        )(dispatch)
            .then(res => oppdaterFargekategoriState(res, data.fargekategoriVerdi, data.fnr, dispatch))
            .then(() => dispatch(skjulModal()));
}

export function lagreFargekategoriAction(fargekategori: FargekategoriModell, fnr: string) {
    return doThenDispatch(() => oppdaterFargekategori(fargekategori), {
        OK: FARGEKATEGORI_REDIGER_OK,
        FEILET: FARGEKATEGORI_REDIGER_FEILET,
        PENDING: FARGEKATEGORI_REDIGER_PENDING
    });
}
