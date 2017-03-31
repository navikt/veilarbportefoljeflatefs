import * as Api from './../middleware/api';
import { STATUS, doThenDispatch, handterFeil, toJson } from './utils';

// Actions
const OK = 'veilarbportefolje/portefolje/OK';
const FEILET = 'veilarbportefolje/portefolje/FEILET';
const PENDING = 'veilarbportefolje/portefolje/PENDING';
const SETT_SORTERING = 'veilarbportefolje/portefolje/SETT_SORTERING';
const SETT_MARKERT_BRUKER = 'veilarbportefolje/portefolje/SETT_MARKERT_BRUKER';
const SETT_MARKERT_BRUKER_ALLE = 'veilarbportefolje/portefolje/SETT_MARKERT_BRUKER_ALLE';
const TILDEL_VEILEDER = 'veilarbportefolje/portefolje/TILDEL_VEILEDER';
const SETT_VALGTVEILEDER = 'veilarbportefolje/portefolje/SETT_VALGTVEILEDER';
const NULLSTILL_FEILENDE_TILORDNINGER = 'veilarbportefolje/portefolje/NULLSTILL_FEILENDE_TILORDNINGER';

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
    sorteringsfelt: 'ikke_satt',
    veileder: {
        ident: 'ikke_satt'
    }
};

function updateVeilederForBruker(brukere, veilederId, feilende) {
    const feilendeFnr = feilende.map((b) => b.brukerFnr);

    return brukere.map((bruker) => {
        if (bruker.markert && !feilendeFnr.includes(bruker.fnr)) {
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
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case SETT_SORTERING: {
            return {
                ...state,
                sorteringsrekkefolge: action.sorteringsrekkefolge,
                sorteringsfelt: action.sorteringsfelt
            };
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
                feilendeTilordninger: action.feilendeTilordninger,
                data: {
                    ...state.data,
                    brukere: updateVeilederForBruker(
                        state.data.brukere,
                        action.tilVeileder,
                        action.feilendeTilordninger
                    )
                }
            };
        }
        case NULLSTILL_FEILENDE_TILORDNINGER: {
            return { ...state, feilendeTilordninger: [] };
        }
        case SETT_MARKERT_BRUKER_ALLE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: state.data.brukere.map((bruker) => ({ ...bruker, markert: action.markert }))
                }
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, fra = 0, antall = 20, filtervalg = {}) {
    return doThenDispatch(() => Api.hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, fra, antall, filtervalg), {
        OK,
        FEILET,
        PENDING
    });
}

// Action Creators
export function hentPortefoljeForVeileder(
    enhet, veileder, rekkefolge, sorteringsfelt, fra = 0, antall = 20, filtervalg = {}) {
    return doThenDispatch(() => Api.hentVeiledersPortefolje(
        enhet, veileder.ident, rekkefolge, sorteringsfelt, fra, antall, filtervalg), {
        OK,
        FEILET,
        PENDING
    });
}

export function settSortering(rekkefolge, felt) {
    return (dispatch) => dispatch({
        type: SETT_SORTERING,
        sorteringsrekkefolge: rekkefolge,
        sorteringsfelt: felt
    });
}


export function settBrukerSomMarkert(fnr, markert) {
    return (dispatch) => dispatch({
        type: SETT_MARKERT_BRUKER,
        fnr,
        markert
    });
}

export function markerAlleBrukere(markert) {
    return (dispatch) => dispatch({
        type: SETT_MARKERT_BRUKER_ALLE,
        markert
    });
}


export function tildelVeileder(tilordninger, tilVeileder) {
    return (dispatch) => {
        Api.tilordneVeileder(tilordninger)
            .then(toJson)
            .then((res) => dispatch({
                type: TILDEL_VEILEDER,
                tilVeileder,
                feilendeTilordninger: res.feilendeTilordninger
            }))
            .catch(handterFeil);
    };
}

export function nullstillFeilendeTilordninger() {
    return (dispatch) => dispatch({
        type: NULLSTILL_FEILENDE_TILORDNINGER
    });
}

export function settValgtVeileder(valgtVeileder) {
    return (dispatch) => dispatch({
        type: SETT_VALGTVEILEDER,
        veileder: valgtVeileder
    });
}
