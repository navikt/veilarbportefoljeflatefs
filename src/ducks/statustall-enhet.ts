import * as Api from './../middleware/api';
import {doThenDispatch, STATUS} from './utils';
import {OrNothing} from '../utils/types/types';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustall-enhet/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustall-enhet/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustall-enhet/PENDING';

/** Felt som er felles for ulike statustall-typar
 * som til dømes dei for enhet og dei for veileder (min oversikt) */
export interface StatustallInnhold {
    totalt: number;
    ufordelteBrukere: number;
    inaktiveBrukere: number;
    venterPaSvarFraNAV: number;
    venterPaSvarFraBruker: number;
    moterMedNAVIdag: number;
    tiltakshendelser: number;
    utlopteAktiviteter: number;
    ikkeIavtaltAktivitet: number;
    iavtaltAktivitet: number;
    minArbeidsliste: number;
    minArbeidslisteBla: number;
    minArbeidslisteLilla: number;
    minArbeidslisteGronn: number;
    minArbeidslisteGul: number;
    erSykmeldtMedArbeidsgiver: number;
    trengerVurdering: number;
    nyeBrukereForVeileder: number;
    underVurdering: number;
    mineHuskelapper: number;
}

export interface StatustallEnhet {
    medBrukerinnsyn: StatustallInnhold;
    utenBrukerinnsyn: StatustallInnhold;
}

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
            trengerVurdering: 0,
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
            trengerVurdering: 0,
            underVurdering: 0,
            mineHuskelapper: 0
        }
    }
};

// Reducer
export default function statustallEnhetReducer(
    state: StatustallEnhetState = initalStatusState,
    action
): StatustallEnhetState {
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
