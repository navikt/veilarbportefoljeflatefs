import { STATUS } from './utils';
import { Action, Dispatch } from 'redux';
import { AppState } from '../reducer';
import { hentEnhetTiltak } from './enhettiltak';
import { hentVeiledereForEnhet } from './veiledere';
import {OrNothing} from "../utils/types/types";
import {pagineringSetup} from "./paginering";
import {leggEnhetIUrl} from "../utils/url-utils";

// Actions
const PENDING = 'veilarbportefolje/enheter/PENDING';
const OK = 'VELG_ENHET';
const INIT = 'INIT_VELG_ENHET';

export interface ValgtEnhetState {
    data: {
        enhetId: OrNothing<string>
    };
    status: string,
}

const initialState: ValgtEnhetState = {
    status: STATUS.NOT_STARTED,
    data: {
        enhetId: undefined
    },
};

//  Reducer
export default function reducer(state: ValgtEnhetState = initialState, action): ValgtEnhetState {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case INIT:
            return {...state, data: {enhetId: action.valgtEnhet}};
        case OK:
            return {...state, data: {enhetId: action.valgtEnhet}, status: STATUS.OK };
        default:
            return state;
    }
}


export function velgEnhetForVeileder(valgtEnhet) {
    const enhetId = valgtEnhet.enhetId ? valgtEnhet.enhetId : valgtEnhet;
    return {
        type: OK,
        valgtEnhet: valgtEnhet
    };
}

export function oppdaterValgtEnhet(nyEnhet: string, history: any) {
    return (dispatch: Dispatch<Action, AppState>, getState: () => AppState) => {
        const state = getState();
        const valgtEnhet = state.valgtEnhet.data;

        if(valgtEnhet && valgtEnhet.enhetId === nyEnhet ) {
            return;
        }
        history.push("?enhet=" + nyEnhet);
        dispatch(velgEnhetForVeileder(nyEnhet));
        //leggSideIUrl(1);
        //leggSeAlleIUrl(false);
        dispatch(pagineringSetup({side: 1, seAlle: false}));
    };
}
