import * as Api from './../middleware/api';
import {doThenDispatch, handterFeil, STATUS} from './utils';
import {pagineringSetup} from './paginering';
import {TILDELING_FEILET, visFeiletModal} from './modal-feilmelding-brukere';
import {visServerfeilModal} from './modal-serverfeil';
import {hentStatustallForVeileder} from './statustall/statustall-veileder';
import {BrukerModell} from '../typer/bruker-modell';
import {selectFraIndex, selectSidestorrelse} from '../components/toolbar/paginering/paginering-selector';
import {visTilordningOkModal} from './modal';
import {AppState} from '../reducer';
import {OrNothing} from '../utils/types/types';
import {OversiktType} from './ui/listevisning';
import {capitalize} from '../utils/utils';
import {hentStatustallForEnhet} from './statustall/statustall-enhet';
import {toJson} from '../middleware/api';
import {FARGEKATEGORI_OPPDATER_OK} from './fargekategori';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../typer/kolonnesortering';

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
const OPPDATER_ANTALL = 'veilarbportefolje/portefolje/OPPDATER_ANTALL';
const NULLSTILL_FEILENDE_TILDELINGER = 'veilarbportefolje/portefolje/NULLSTILL_FEILENDE_TILDELINGER';
const OPPDATER_HUSKELAPP_BRUKER = 'veilarbportefolje/portefolje/HUSKELAPP_BRUKER';

function lagBrukerGuid(bruker) {
    return bruker.fnr === '' ? `${Math.random()}`.slice(2) : bruker.fnr;
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
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
    feilendeTilordninger?: any[];
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
    sorteringsrekkefolge: null,
    sorteringsfelt: null,
    tilordningerstatus: STATUS.OK
};

function updateVeilederForBruker(brukere, veilederId, feilende) {
    const feilendeFnr = feilende.map(b => b.brukerFnr);

    return brukere.map(bruker => {
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
    return brukere.map(bruker => {
        if (bruker.guid === action.guid) {
            return {
                ...bruker,
                markert: action.markert
            };
        }
        return bruker;
    });
}

function oppdaterHuskelappForbruker(brukere, huskelapp) {
    return brukere.map(bruker => {
        if (bruker.fnr === huskelapp?.brukerFnr) {
            return {
                ...bruker,
                huskelapp: huskelapp.huskelappId
                    ? {
                          kommentar: huskelapp.kommentar,
                          frist: huskelapp.frist,
                          huskelappId: huskelapp.huskelappId,
                          endretDato: huskelapp.endretDato,
                          endretAv: huskelapp.endretAv,
                          enhetId: huskelapp.enhetId
                      }
                    : null
            };
        }
        return bruker;
    });
}

function updateFargekategoriForBrukere(brukere, fargekategoridata) {
    return brukere.map(bruker => {
        if (fargekategoridata.data.some(f => f === bruker.fnr)) {
            return {
                ...bruker,
                fargekategori: fargekategoridata.fargekategoriVerdi
            };
        }
        return bruker;
    });
}

export function portefoljeReducer(state = initialState, action): PortefoljeState {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: {...action.data, brukere: []}};
        case OK:
            return {
                ...state,
                status: STATUS.OK,
                data: {
                    ...action.data,
                    brukere: action.data.brukere.map(bruker => ({
                        ...bruker,
                        guid: lagBrukerGuid(bruker),
                        fornavn: capitalize(bruker.fornavn),
                        etternavn: capitalize(bruker.etternavn)
                    }))
                }
            };
        case SETT_SORTERING: {
            return {
                ...state,
                sorteringsrekkefolge: action.sorteringsrekkefolge,
                sorteringsfelt: action.sorteringsfelt
            };
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
            return {...state, tilordningerstatus: STATUS.RELOADING};
        }
        case TILDEL_VEILEDER_OK: {
            return {...state, tilordningerstatus: STATUS.OK};
        }
        case TILDEL_VEILEDER_FEILET: {
            return {...state, tilordningerstatus: STATUS.ERROR};
        }
        case NULLSTILL_FEILENDE_TILDELINGER: {
            return {...state, feilendeTilordninger: []};
        }
        case SETT_MARKERT_BRUKER_ALLE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: state.data.brukere.map(bruker => {
                        if (bruker.fnr !== '') {
                            return {...bruker, markert: action.markert};
                        }
                        return {...bruker};
                    })
                }
            };
        }
        case FARGEKATEGORI_OPPDATER_OK: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: updateFargekategoriForBrukere(state.data.brukere, action.data)
                }
            };
        }
        case OPPDATER_HUSKELAPP_BRUKER: {
            return {
                ...state,
                data: {
                    ...state.data,
                    brukere: oppdaterHuskelappForbruker(state.data.brukere, action.huskelapp)
                }
            };
        }
        default:
            return state;
    }
}

function hentPortefolje(hentPortefoljeFn: (...args: any[]) => void, ...args: any[]) {
    const fn = (dispatch, getState) => {
        const state = getState();
        const fra = selectFraIndex(state);
        const antall = selectSidestorrelse(state);

        return hentPortefoljeFn(...args, fra, antall);
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
    return dispatch =>
        dispatch({
            type: SETT_SORTERING,
            sorteringsrekkefolge: rekkefolge,
            sorteringsfelt: felt
        });
}

export function settBrukerSomMarkert(guid, markert) {
    return dispatch =>
        dispatch({
            type: SETT_MARKERT_BRUKER,
            guid,
            markert
        });
}

export function markerAlleBrukere(markert) {
    return dispatch =>
        dispatch({
            type: SETT_MARKERT_BRUKER_ALLE,
            markert
        });
}

export function tildelVeileder(tilordninger, tilVeileder, oversiktType, veilederIdent) {
    return (dispatch, getState: () => AppState) => {
        dispatch({type: TILDEL_VEILEDER_RELOAD});
        dispatch({type: PENDING});
        Api.tilordneVeileder(tilordninger)
            .then(toJson)
            .then(res => {
                dispatch({
                    type: TILDEL_VEILEDER,
                    tilVeileder,
                    feilendeTilordninger: res.feilendeTilordninger
                });
                if (res.feilendeTilordninger.length > 0) {
                    const feilendeTilordninger = res.feilendeTilordninger;
                    const feiledeFnr = feilendeTilordninger.map(f => f.brukerFnr);

                    const vellykkedeTilordninger = tilordninger
                        .filter(tilordning => !feiledeFnr.includes(tilordning.brukerFnr))
                        .map(tilordning => ({brukerFnr: tilordning.brukerFnr}));

                    visFeiletModal({
                        aarsak: TILDELING_FEILET,
                        brukereError: feilendeTilordninger,
                        brukereOk: vellykkedeTilordninger
                    })(dispatch);
                } else {
                    dispatch(visTilordningOkModal(tilordninger.map(tilordning => ({brukerFnr: tilordning.brukerFnr}))));
                    dispatch(pagineringSetup({side: 1}));
                }
                if (oversiktType === OversiktType.minOversikt) {
                    dispatch({
                        type: OPPDATER_ANTALL,
                        antallTilordninger: tilordninger.length - res.feilendeTilordninger.length
                    });
                }
            })
            .then(() => {
                // Venter litt slik at indeks kan komme i sync
                setTimeout(() => {
                    const enhet = getState().valgtEnhet.data.enhetId;
                    const rekkefolge = getState().portefolje.sorteringsrekkefolge;
                    const sorteringsfelt = getState().portefolje.sorteringsfelt;
                    if (oversiktType === OversiktType.minOversikt) {
                        const filtervalg = getState().filtreringMinoversikt;
                        dispatch(
                            hentPortefoljeForVeileder(enhet, veilederIdent, rekkefolge, sorteringsfelt, filtervalg)
                        );
                    } else {
                        const filtervalg = getState().filtreringEnhetensOversikt;
                        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, filtervalg));
                    }
                }, 2000);
            })
            .catch(error => {
                visServerfeilModal()(dispatch);
                // TILDEL_VEILEDER_FEILET setter errorstatus slik at spinner forsvinner
                return handterFeil(dispatch, TILDEL_VEILEDER_FEILET)(error);
            })
            .then(() => {
                // Venter litt slik at indeks kan komme i sync
                setTimeout(() => {
                    const enhet = getState().valgtEnhet.data.enhetId;
                    if (oversiktType === OversiktType.minOversikt) {
                        hentStatustallForVeileder(enhet, veilederIdent)(dispatch);
                    } else {
                        hentStatustallForEnhet(enhet)(dispatch);
                    }
                }, 2000);
            });
    };
}

export function hentHuskelappForBruker(fodselsnummer: string, enhetId: string) {
    return dispatch => {
        Api.hentHuskelappForBruker(fodselsnummer, enhetId).then(huskelapp => {
            dispatch({
                type: OPPDATER_HUSKELAPP_BRUKER,
                huskelapp: huskelapp ?? {brukerFnr: fodselsnummer}
            });
        });
    };
}
