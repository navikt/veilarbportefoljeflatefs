import * as Api from './../middleware/api';
import { doThenDispatch, handterFeil, nameToStateSliceMap, STATUS, toJson } from './utils';
import { IKKE_SATT } from '../konstanter';
import { pagineringSetup } from './paginering';
import { TILORDNING_FEILET, visFeiletModal } from './modal-feilmelding-brukere';
import { visServerfeilModal } from './modal-serverfeil';
import { hentStatusTall } from './statustall';
import { leggSideIUrl, leggSorteringIUrl } from '../utils/url-utils';
import { BrukerModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { ListevisningType, oppdaterAlternativer } from './ui/listevisning';
import { selectFraIndex, selectSeAlle, selectSideStorrelse } from '../components/toolbar/paginering/paginering-selector';
import { ToolbarPosisjon } from '../components/toolbar/toolbar';

// Actions
const OK = 'veilarbportefolje/portefolje/OK';
const FEILET = 'veilarbportefolje/portefolje/FEILET';
const PENDING = 'veilarbportefolje/portefolje/PENDING';
export const SETT_SORTERING = 'veilarbportefolje/portefolje/SETT_SORTERING';
const SETT_MARKERT_BRUKER = 'veilarbportefolje/portefolje/SETT_MARKERT_BRUKER';
export const SETT_MARKERT_BRUKER_ALLE = 'veilarbportefolje/portefolje/SETT_MARKERT_BRUKER_ALLE';
export const TILDEL_VEILEDER = 'veilarbportefolje/portefolje/TILDEL_VEILEDER';
const TILDEL_VEILEDER_RELOAD = 'veilarbportefolje/portefolje/TILDEL_VEILEDER_RELOAD';
const TILDEL_VEILEDER_OK = 'veilarbportefolje/portefolje/TILDEL_VEILEDER_OK';
const TILDEL_VEILEDER_FEILET = 'veilarbportefolje/portefolje/TILDEL_VEILEDER_FEILET';
const SETT_VALGTVEILEDER = 'veilarbportefolje/portefolje/SETT_VALGTVEILEDER';
const OPPDATER_ANTALL = 'veilarbportefolje/portefolje/OPPDATER_ANTALL';
const NULLSTILL_FEILENDE_TILORDNINGER = 'veilarbportefolje/portefolje/NULLSTILL_FEILENDE_TILORDNINGER';
const OPPDATER_ARBEIDSLISTE = 'veilarbportefolje/portefolje/OPPDATER_ARBEIDSLISTE';

function lagBrukerGuid(bruker) {
    return bruker.fnr === '' ? (`${Math.random()}`).slice(2) : bruker.fnr;
}

// Reducer
export interface PortefoljeData {
    brukere: BrukerModell[];
    antallTotalt: number;
    antallReturnert: number;
    fraIndex: number;
}

export interface PortefoljeState {
    status: string;
    data: PortefoljeData;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    sorteringsfelt: Sorteringsfelt;
    feilendeTilordninger?: any[];
    veileder: {
        ident: string;
    };
    tilordningerstatus: string;
}

const initialState: PortefoljeState = {
    status: STATUS.NOT_STARTED,
    data: {
        brukere: [],
        antallTotalt: 0,
        antallReturnert: 0,
        fraIndex: 0
    },
    sorteringsrekkefolge: Sorteringsrekkefolge.ikke_satt,
    sorteringsfelt: Sorteringsfelt.IKKE_SATT,
    veileder: {
        ident: IKKE_SATT
    },
    tilordningerstatus: STATUS.OK
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
        if (bruker.guid === action.guid) {
            return {
                ...bruker,
                markert: action.markert
            };
        }
        return bruker;
    });
}

function updateArbeidslisteForBrukere(brukere, arbeidsliste) {
    return brukere
        .map((bruker) => {
            const arbeidslisteForBruker = arbeidsliste.filter((a) => a.fnr === bruker.fnr);
            if (arbeidslisteForBruker.length === 1) {
                return {
                    ...bruker,
                    arbeidsliste: { ...bruker.arbeidsliste, ...arbeidslisteForBruker[0] }
                };
            }
            return bruker;
        });
}

export default function reducer(state = initialState, action): PortefoljeState {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state,
                status: STATUS.OK,
                data: {
                    ...action.data,
                    brukere: action.data.brukere.map((bruker) => ({ ...bruker, guid: lagBrukerGuid(bruker) }))
                } };
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
                tilordningerstatus: STATUS.OK,
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
        case OPPDATER_ANTALL:
            return {
                ...state,
                data: {
                    ...state.data,
                    antallTotalt: state.data.antallTotalt - action.antallTilordninger,
                    antallReturnert: state.data.antallReturnert - action.antallTilordninger
                }
            };
        case TILDEL_VEILEDER_RELOAD: {
            return { ...state, tilordningerstatus: STATUS.RELOADING };
        }
        case TILDEL_VEILEDER_OK: {
            return { ...state, tilordningerstatus: STATUS.OK };
        }
        case TILDEL_VEILEDER_FEILET: {
            return { ...state, tilordningerstatus: STATUS.ERROR };
        }
        case NULLSTILL_FEILENDE_TILORDNINGER: {
            return { ...state, feilendeTilordninger: [] };
        }
        case SETT_MARKERT_BRUKER_ALLE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: state.data.brukere
                        .map((bruker) => {
                            if(bruker.fnr !== '') {
                                return {...bruker, markert: action.markert};
                            }
                            return {...bruker};
                        })
                }
            };
        }
        case OPPDATER_ARBEIDSLISTE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: updateArbeidslisteForBrukere(
                        state.data.brukere,
                        action.arbeidsliste
                    )
                }
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function oppdaterPortefolje(getState, dispatch, filtergruppe, veileder) {
    if(typeof veileder === 'object' ) {
        console.warn('Veileder should be a string, not an object'); // tslint:disable-line
        veileder = veileder.ident;
    }
    const state = getState();
    const enhet = state.enheter.valgtEnhet.enhet.enhetId;
    const rekkefolge = state.portefolje.sorteringsrekkefolge;
    const sorteringfelt = state.portefolje.sorteringsfelt;
    const nyeFiltervalg = state[nameToStateSliceMap[filtergruppe]];

    leggSideIUrl(1);
    dispatch(pagineringSetup({side: 1}));

    if (filtergruppe === 'enhet') {
        hentPortefoljeForEnhet(enhet, rekkefolge, sorteringfelt, nyeFiltervalg)(dispatch, getState);
        oppdaterAlternativer(dispatch, getState, ListevisningType.enhetensOversikt);
    } else if (filtergruppe === 'veileder') {
        hentPortefoljeForVeileder(enhet, veileder, rekkefolge, sorteringfelt, nyeFiltervalg)(dispatch, getState);
        oppdaterAlternativer(dispatch, getState, ListevisningType.minOversikt);
    }
}

function hentPortefolje(hentPorefoljeFn: (...args: any[]) => void, ...args: any[]) {
    const fn = (dispatch, getState) => {
        const state = getState();
        const seAlle = selectSeAlle(state);
        const fra = seAlle ? undefined : selectFraIndex(state);
        const antall = seAlle ? undefined : selectSideStorrelse(state);

        // todo sortering should be read from the state as well
        return hentPorefoljeFn(...args, fra, antall);
    };
    return doThenDispatch(fn, {
        OK,
        FEILET,
        PENDING
    });
}

// Action Creators
export function hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, filtervalg) {
    return hentPortefolje(Api.hentEnhetsPortefolje, enhet, rekkefolge, sorteringsfelt, filtervalg);
}

export function hentPortefoljeForVeileder(enhet, veileder, rekkefolge, sorteringsfelt, filtervalg) {
    return hentPortefolje(Api.hentVeiledersPortefolje, enhet, veileder, rekkefolge, sorteringsfelt, filtervalg);
}

export function settSortering(rekkefolge, felt) {
    leggSorteringIUrl(felt, rekkefolge);
    return (dispatch) => dispatch({
        type: SETT_SORTERING,
        sorteringsrekkefolge: rekkefolge,
        sorteringsfelt: felt
    });
}

export function settBrukerSomMarkert(guid, markert) {
    return (dispatch) => dispatch({
        type: SETT_MARKERT_BRUKER,
        guid,
        markert
    });
}

export function markerAlleBrukere(markert, toolbarPosisjon?: ToolbarPosisjon) {
    return (dispatch) => dispatch({
        type: SETT_MARKERT_BRUKER_ALLE,
        markert,
        toolbarPosisjon
    });
}

export function tildelVeileder(tilordninger, tilVeileder, filtergruppe, gjeldendeVeileder, toolbarPosisjon?: ToolbarPosisjon) {
    const veilederIdent = gjeldendeVeileder ? gjeldendeVeileder.ident : undefined;
    return (dispatch, getState) => {
        dispatch({ type: TILDEL_VEILEDER_RELOAD });
        dispatch({ type: PENDING });
        Api.tilordneVeileder(tilordninger)
            .then(toJson)
            .then((res) => {
                dispatch({
                    type: TILDEL_VEILEDER,
                    tilVeileder,
                    toolbarPosisjon,
                    feilendeTilordninger: res.feilendeTilordninger
                });
                if (res.feilendeTilordninger.length > 0) {
                    visFeiletModal({
                        aarsak: TILORDNING_FEILET,
                        brukereError: res.feilendeTilordninger
                    })(dispatch);
                }
                if (filtergruppe === 'minOversikt') {
                    dispatch({
                        type: OPPDATER_ANTALL,
                        antallTilordninger: tilordninger.length - res.feilendeTilordninger.length
                    });
                }
            })
            .catch((error) => {
                visServerfeilModal()(dispatch);
                // TILDEL_VEILEDER_FEILET setter errorstatus slik at spinner forsvinner
                return handterFeil(dispatch, TILDEL_VEILEDER_FEILET)(error);
            })
            .then(() => {
                // Venter litt slik at indeks kan komme i sync
                setTimeout(() => {
                    const side = filtergruppe === 'minOversikt' ? 'veileder' : 'enhet';
                    const ident = veilederIdent || getState().enheter.ident ;
                    oppdaterPortefolje(getState, dispatch, side, ident);
                }, 2000);
            })
            .then(() => {
                // Venter litt slik at indeks kan komme i sync
                setTimeout(() => {
                    const enhet = getState().enheter.valgtEnhet.enhet.enhetId;
                    hentStatusTall(enhet, veilederIdent)(dispatch);
                }, 2000);
            });
    };
}

export function settTilordningStatusOk() {
    return (dispatch) => dispatch({
        type: TILDEL_VEILEDER_OK
    });
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

export function oppdaterArbeidslisteForBruker(arbeidsliste) {
    return (dispatch) => dispatch({
        type: OPPDATER_ARBEIDSLISTE,
        arbeidsliste
    });
}
