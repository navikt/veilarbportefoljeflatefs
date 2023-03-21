import * as Api from './../middleware/api';
import {doThenDispatch, STATUS} from './utils';
import {OrNothing} from '../utils/types/types';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustall-veileder/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustall-veileder/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustall-veileder/PENDING';
export const LEGG_TIL_STATUSTALL = 'veilarbportefoljeflatefs/statustall-veileder/LEGG_TIL_STATUSTALL';

export interface StatustallVeileder {
    totalt: number;
    ufordelteBrukere: number;
    inaktiveBrukere: number;
    venterPaSvarFraNAV: number;
    venterPaSvarFraBruker: number;
    utlopteAktiviteter: number;
    ikkeIavtaltAktivitet: number;
    iavtaltAktivitet: number;
    minArbeidsliste: number;
    minArbeidslisteBla: number;
    minArbeidslisteLilla: number;
    minArbeidslisteGronn: number;
    minArbeidslisteGul: number;
    erSykmeldtMedArbeidsgiver: number;
    moterMedNAVIdag: number;
    trengerVurdering: number;
    nyeBrukereForVeileder: number;
    underVurdering: number;
}

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
        utlopteAktiviteter: 0,
        ikkeIavtaltAktivitet: 0,
        iavtaltAktivitet: 0,
        minArbeidsliste: 0,
        minArbeidslisteBla: 0,
        minArbeidslisteLilla: 0,
        minArbeidslisteGronn: 0,
        minArbeidslisteGul: 0,
        erSykmeldtMedArbeidsgiver: 0,
        nyeBrukereForVeileder: 0,
        moterMedNAVIdag: 0,
        trengerVurdering: 0,
        underVurdering: 0
    }
};

// Reducer
export default function statustallVeilederReducer(
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
export function hentStatustallForVeileder(enhet: OrNothing<string>, veileder: string) {
    return doThenDispatch(() => Api.hentStatusTallForVeileder(enhet, veileder), {
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
