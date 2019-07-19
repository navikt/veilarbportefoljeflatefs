import * as Api from './../middleware/api';
import { doThenDispatch, STATUS } from './utils';

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
}

export interface StatustallData {data: Statustall;}

export interface StatustallState {
    status: string;
    data: Statustall;
}

const initalState: StatustallState = {
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
        nyeBrukereForVeileder:0,
        moterMedNAVIdag: 0,
        trengerVurdering: 0,
    }
};

// Reducer
export default function reducer(state: StatustallState = initalState, action): StatustallState {
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
export function hentStatusTall(enhet: string, veileder?: string) {
    if (veileder == null) {
        return doThenDispatch(() => Api.hentStatusTall(enhet), {
            OK,
            FEILET,
            PENDING
        });
    }
    return doThenDispatch(() => Api.hentStatusTallForveileder(enhet, veileder), {
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
