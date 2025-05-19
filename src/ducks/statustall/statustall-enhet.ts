import * as Api from '../../middleware/api';
import {doThenDispatch, STATUS} from '../utils';
import {OrNothing} from '../../utils/types/types';
import {StatustallEnhet} from './statustall-typer';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustall-enhet/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustall-enhet/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustall-enhet/PENDING';

export interface StatustallEnhetState {
    status: string;
    data: StatustallEnhet;
}

export const initalStatusState: StatustallEnhetState = {
    status: STATUS.NOT_STARTED,
    data: {
        medBrukerinnsyn: {
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
            mineHuskelapper: 0
        },
        utenBrukerinnsyn: {
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
            mineHuskelapper: 0
        }
    }
};

// Reducer
export function statustallEnhetReducer(state: StatustallEnhetState = initalStatusState, action): StatustallEnhetState {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {
                ...state,
                status: STATUS.ERROR,
                data: {
                    medBrukerinnsyn: action.data.statustallMedBrukerinnsyn,
                    utenBrukerinnsyn: action.data.statustallUtenBrukerinnsyn
                }
            };
        case OK: {
            return {
                ...state,
                status: STATUS.OK,
                data: {
                    medBrukerinnsyn: action.data.statustallMedBrukerinnsyn,
                    utenBrukerinnsyn: action.data.statustallUtenBrukerinnsyn
                }
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentStatustallForEnhet(enhet: OrNothing<string>) {
    return doThenDispatch(() => Api.hentStatusTall(enhet), {
        OK,
        FEILET,
        PENDING
    });
}
