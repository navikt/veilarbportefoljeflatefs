import queryString from 'query-string';
import { hentEnheter } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';


// Actions
export const OK = 'veilarbportefolje/enheter/OK';
export const FEILET = 'veilarbportefolje/enheter/FEILET';
export const PENDING = 'veilarbportefolje/enheter/PENDING';

export const VELG_ENHET = 'VELG_ENHET';

const initialState = {
    data: [],
    valgtEnhet: undefined,
    ident: queryString.parse(location.search).ident
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data[Object.keys(action.data)[0]].enhetListe };
        case VELG_ENHET:
            return { ...state, valgtEnhet: action.valgtEnhet };
        default:
            return state;
    }
}

// Action Creators
export function hentEnheterForSaksbehandler(ident) {
    return doThenDispatch(() => hentEnheter(ident), {
        OK,
        FEILET,
        PENDING
    });
}

export function leggEnhetIUrl(enhet) { // eslint-disable-line consistent-return
    if (!enhet) return null;
    const parsed = queryString.parse(location.search);
    parsed.enhet = enhet.enhetId;

    const stringified = queryString.stringify(parsed);
    const pathname = window.location.pathname;
    window.history.replaceState({}, null, `${pathname}?${stringified}`);
}

export function velgEnhetForSaksbehandler(valgtEnhet) {
    leggEnhetIUrl(valgtEnhet);
    return {
        type: VELG_ENHET,
        valgtEnhet
    };
}
