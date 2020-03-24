import * as Api from './../middleware/api';
import { doThenDispatch, STATUS } from './utils';
import { OrNothing } from '../utils/types/types';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustall/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustall/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustall/PENDING';
export const LEGG_TIL_STATUSTALL = 'LEGG_TIL_STATUSTALL';

export interface Statustall {
    totalt: number;
    ufordelteBrukere: number;
    inaktiveBrukere: number;
    venterPaSvarFraNAV: number;
    venterPaSvarFraBruker: number;
    utlopteAktiviteter: number;
    ikkeIavtaltAktivitet: number;
    iavtaltAktivitet: number;
    minArbeidsliste: number;
    erSykmeldtMedArbeidsgiver: number;
    moterMedNAVIdag: number;
    trengerVurdering: number;
    nyeBrukereForVeileder: number;
    underVurdering: number;
    erPermittertUtenOppfolgingdVedtak: number;
}

export interface StatustallState {
    status: string;
    data: Statustall;
}

export const initalStatusState: StatustallState = {
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
        erSykmeldtMedArbeidsgiver: 0,
        nyeBrukereForVeileder: 0,
        moterMedNAVIdag: 0,
        trengerVurdering: 0,
        underVurdering: 0,
        erPermittertUtenOppfolgingdVedtak: 0,
    }
};

// Reducer
export default function reducer(state: StatustallState = initalStatusState, action): StatustallState {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        case LEGG_TIL_STATUSTALL: {
            return {
                ...state,
                data: {
                    ...state.data, [action.statustall]: state.data[action.statustall] + action.antall
                }
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentStatusTall(enhet: OrNothing<string>, veileder?: string) {
    if (veileder == null) {
        return doThenDispatch(() => Api.hentStatusTall(enhet), {
            OK,
            FEILET,
            PENDING
        });
    }
    return doThenDispatch(() => Api.hentStatusTallForVeileder(enhet, veileder), {
        OK,
        FEILET,
        PENDING
    });
}

export function leggTilStatustall(statustall, antall) {
    return (dispatch) => dispatch({
        type: LEGG_TIL_STATUSTALL,
        statustall,
        antall
    });
}
