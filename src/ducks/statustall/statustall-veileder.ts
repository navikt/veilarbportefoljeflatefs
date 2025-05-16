import * as Api from '../../middleware/api';
import {doThenDispatch, STATUS} from '../utils';
import {OrNothing} from '../../utils/types/types';
import {StatustallVeileder} from './statustall-typer';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustall-veileder/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustall-veileder/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustall-veileder/PENDING';
export const LEGG_TIL_STATUSTALL = 'veilarbportefoljeflatefs/statustall-veileder/LEGG_TIL_STATUSTALL';

export interface StatustallVeilederState {
    status: string;
    data: StatustallVeileder;
}

export const initalStatusState: StatustallVeilederState = {
    status: STATUS.NOT_STARTED,
    data: {
        totalt: 0,
        ufordelteBrukere: 0,
        inaktiveBrukere: 0,
        venterPaSvarFraNAV: 0,
        venterPaSvarFraBruker: 0,
        moterMedNAVIdag: 0,
        tiltakshendelser: 0,
        utgatteVarsel: 0,
        utlopteAktiviteter: 0,
        ikkeIavtaltAktivitet: 0,
        iavtaltAktivitet: 0,
        erSykmeldtMedArbeidsgiver: 0,
        nyeBrukereForVeileder: 0,
        trengerOppfolgingsvedtak: 0,
        underVurdering: 0,
        mineHuskelapper: 0,
        fargekategoriA: 0,
        fargekategoriB: 0,
        fargekategoriC: 0,
        fargekategoriD: 0,
        fargekategoriE: 0,
        fargekategoriF: 0,
        fargekategoriIngenKategori: 0
    }
};

// Reducer
export function statustallVeilederReducer(
    state: StatustallVeilederState = initalStatusState,
    action
): StatustallVeilederState {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: action.data.statustall};
        case OK: {
            return {...state, status: STATUS.OK, data: action.data.statustall};
        }
        case LEGG_TIL_STATUSTALL: {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.statustall]: state.data[action.statustall] + action.antall
                }
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentStatustallForVeileder(enhet: OrNothing<string>, veilederId: string) {
    return doThenDispatch(() => Api.hentStatusTallForVeileder(enhet, veilederId), {
        OK,
        FEILET,
        PENDING
    });
}

export function leggTilStatustall(statustall, antall) {
    return dispatch =>
        dispatch({
            type: LEGG_TIL_STATUSTALL,
            statustall,
            antall
        });
}
