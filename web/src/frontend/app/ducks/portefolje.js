import * as Api from './../middleware/api';
import { STATUS, doThenDispatch, handterFeil } from './utils';

// Actions
const OK = 'veilarbportefolje/portefolje/OK';
const FEILET = 'veilarbportefolje/portefolje/FEILET';
const PENDING = 'veilarbportefolje/portefolje/PENDING';
const SETT_SORTERINGSREKKEFOLGE = 'veilarbportefolje/portefolje/SETT_SORTERINGSREKKEFOLGE';
const SETT_MARKERT_BRUKER = 'veilarbportefolje/portefolje/SETT_MARKERT_BRUKER';
const TILDEL_VEILEDER = 'veilarbportefolje/portefolje/TILDEL_VEILEDER';
const SETT_VALGTVEILEDER = 'veilarbportefolje/portefolje/SETT_VALGTVEILEDER';

// Reducer

const initialState = {
    status: STATUS.NOT_STARTED,
    data: {
        brukere: [],
        antallTotalt: 0,
        antallReturnert: 0,
        fraIndex: 0
    },
    sorteringsrekkefolge: 'ikke_satt',
    veileder: 'ikke_satt'
};

function updateVeilederForBruker(brukere, veilederId) {
    return brukere.map((bruker) => {
        if (bruker.markert) {
            return {
                ...bruker,
                veilederId,
                markert: false
            };
        }
        return bruker;
    });
}

function updateBrukerInArray(brukere, action) {
    return brukere.map((bruker) => {
        if (bruker.fnr === action.fnr) {
            return {
                ...bruker,
                markert: action.markert
            };
        }
        return bruker;
    });
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case SETT_SORTERINGSREKKEFOLGE: {
            return { ...state, sorteringsrekkefolge: action.sorteringsrekkefolge };
        }
        case SETT_VALGTVEILEDER: {
            return { ...state, veileder: action.veileder };
        }
        case SETT_MARKERT_BRUKER: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: updateBrukerInArray(state.data.brukere, action)
                }
            };
        }
        case TILDEL_VEILEDER: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: updateVeilederForBruker(state.data.brukere, action.tilVeileder)
                }
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentPortefoljeForEnhet(enhet, rekkefolge, fra = 0, antall = 20) {
    return doThenDispatch(() => Api.hentEnhetsPortefolje(enhet, rekkefolge, fra, antall), {
        OK,
        FEILET,
        PENDING
    });
}

// Action Creators
export function hentPortefoljeForVeileder(enhet, veileder, rekkefolge, fra = 0, antall = 20) {
    return doThenDispatch(() => Api.hentVeiledersPortefolje(enhet, veileder.ident, rekkefolge, fra, antall), {
        OK,
        FEILET,
        PENDING
    });
}

export function settSorterRekkefolge(rekkefolge) {
    return dispatch => dispatch({
        type: SETT_SORTERINGSREKKEFOLGE,
        sorteringsrekkefolge: rekkefolge

    });
}


export function settBrukerSomMarkert(fnr, markert) {
    return dispatch => dispatch({
        type: SETT_MARKERT_BRUKER,
        fnr,
        markert
    });
}


export function tildelVeileder(tilordninger, tilVeileder) {
    return (dispatch) => {
        Api.tilordneVeileder(tilordninger)
            .then(() => dispatch({
                type: TILDEL_VEILEDER,
                tilVeileder
            })).catch(handterFeil);
    };
}

export function settValgtVeileder(valgtVeileder) {
    return dispatch => dispatch({
        type: SETT_VALGTVEILEDER,
        veileder: valgtVeileder

    });
}
