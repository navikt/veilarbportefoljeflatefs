import {STATUS} from './utils';
import {Action, Dispatch} from 'redux';
import {AppState} from '../reducer';
import {pagineringSetup} from './paginering';
import {DEFAULT_PAGINERING_STORRELSE} from '../konstanter';
import * as Api from '../middleware/api';
import {DataAction} from './types';

// Actions
const PENDING = 'veilarbportefolje/enheter/PENDING';
const OK = 'VELG_ENHET';
const INIT = 'INIT_VELG_ENHET';

enum EnhetIKontekstActionType {
    SETT_ENHET = 'EnhetIKontekst/SETT_ENHET'
}

type EnhetIKontekst = string | null;
type EnhetIKontekstDataAction = DataAction<EnhetIKontekstActionType, EnhetIKontekst>;

export interface ValgtEnhetState {
    data: {
        enhetId: EnhetIKontekst;
    };
    status: string;
}

const initialState: ValgtEnhetState = {
    status: STATUS.NOT_STARTED,
    data: {
        enhetId: null
    }
};

//  Reducer
export function valgtEnhetReducer(state: ValgtEnhetState = initialState, action): ValgtEnhetState {
    switch (action.type) {
        case PENDING:
            return {...state, status: STATUS.PENDING};
        case INIT:
            return {...state, data: {enhetId: action.valgtEnhet}};
        case OK:
        case EnhetIKontekstActionType.SETT_ENHET:
            return {
                ...state,
                data: {enhetId: action.valgtEnhet},
                status: STATUS.OK
            };
        default:
            return state;
    }
}

export function velgEnhetForVeileder(valgtEnhet) {
    return {
        type: OK,
        valgtEnhet: valgtEnhet
    };
}

export function oppdaterValgtEnhet(nyEnhet: string) {
    return (dispatch: Dispatch<Action>, getState: () => AppState) => {
        const state = getState();
        const valgtEnhet = state.valgtEnhet.data;

        if (valgtEnhet && valgtEnhet.enhetId === nyEnhet) {
            return;
        }
        dispatch(velgEnhetForVeileder(nyEnhet));
        dispatch(pagineringSetup({side: 1, sidestorrelse: DEFAULT_PAGINERING_STORRELSE}));
    };
}

const settEnhet = (data: EnhetIKontekst) => ({type: EnhetIKontekstActionType.SETT_ENHET, valgtEnhet: data});

// Side effects
export const hentEnhetIKontekst = () => {
    return (dispatch: Dispatch<EnhetIKontekstDataAction>) =>
        Api.hentEnhetIKontekst().then(data => dispatch(settEnhet(data)));
};
