import queryString from "query-string";
import {hentVeiledersEnheter} from "./../middleware/api";
import {STATUS, doThenDispatch} from "./utils";
import {leggEnhetIUrl} from "../utils/utils";

// Actions
const OK = 'veilarbportefolje/enheter/OK';
const FEILET = 'veilarbportefolje/enheter/FEILET';
const PENDING = 'veilarbportefolje/enheter/PENDING';
const SETT_VALGTVEILEDER = 'veilarbportefolje/portefolje/SETT_VALGTVEILEDER';

const VELG_ENHET = 'VELG_ENHET';

const initialState = {
    data: [],
    valgtEnhet: undefined,
    valgtVeileder: undefined,
    ident: queryString.parse(location.search).ident
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case OK:
            return {...state, status: STATUS.OK, data: action.data.enhetliste};
        case VELG_ENHET:
            return {...state, valgtEnhet: action.valgtEnhet};
        case SETT_VALGTVEILEDER: {
            return { ...state, valgtVeileder: action.valgtVeileder };
        }
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
    leggEnhetIUrl(valgtEnhet);
    return {
        type: VELG_ENHET,
        valgtEnhet
    };
}

export function settValgtVeileder(valgtVeileder) {
    return dispatch => dispatch({
        type: SETT_VALGTVEILEDER,
        valgtVeileder: valgtVeileder
    });
}
