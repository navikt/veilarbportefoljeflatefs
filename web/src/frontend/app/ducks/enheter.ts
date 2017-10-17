import { hentVeiledersEnheter } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';
import { leggEnhetIUrl } from '../utils/utils';
import { ValgtEnhetModell } from '../model-interfaces';

// Actions
const OK = 'veilarbportefolje/enheter/OK';
const FEILET = 'veilarbportefolje/enheter/FEILET';
const PENDING = 'veilarbportefolje/enheter/PENDING';
const VELG_ENHET = 'VELG_ENHET';

export interface EnheterState {
    data: any[];
    valgtEnhet: ValgtEnhetModell;
    ident?: string;
    status: string;
}

const initialState: EnheterState = {
    data: [],
    valgtEnhet: {
        status: STATUS.NOT_STARTED,
        enhet: undefined
    },
    ident: undefined,
    status: STATUS.NOT_STARTED
};

//  Reducer
export default function reducer(state: EnheterState = initialState, action): EnheterState {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data.enhetliste, ident: action.data.ident };
        case VELG_ENHET:
            return {
                ...state,
                valgtEnhet: {
                    enhet: {
                        enhetId: action.valgtEnhet
                    },
                    status: STATUS.OK
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function hentEnheterForVeileder() {
    return doThenDispatch(() => hentVeiledersEnheter(), {
        OK,
        FEILET,
        PENDING
    });
}

export function velgEnhetForVeileder(valgtEnhet) {
    const enhetId = valgtEnhet.enhetId ? valgtEnhet.enhetId : valgtEnhet;
    leggEnhetIUrl(enhetId);
    return {
        type: VELG_ENHET,
        valgtEnhet: enhetId
    };
}
