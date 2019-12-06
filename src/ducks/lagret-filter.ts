import {
    hentEnhetsFilterGrupper,
    nyVeiledergruppe,
    redigerVeiledergruppe,
    slettVeiledergruppe
} from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';
import { FiltervalgModell } from '../model-interfaces';

// Actions
export const HENT_VEILEDERGRUPPER_OK = 'veiledergrupper/OK';
export const HENT_VEILEDERGRUPPER_FEILET = 'veiledergrupper/FEILET';
export const HENT_VEILEDERGRUPPER_PENDING = 'veiledergrupper/PENDING';

export const REDIGER_VEILEDERGRUPPER_OK = 'veiledergrupper_endre/OK';
export const REDIGER_VEILEDERGRUPPER_FEILET = 'veiledergrupper_endre/FEILET';
export const REDIGER_VEILEDERGRUPPER_PENDING = 'veiledergrupper_endre/PENDING';

export const NY_VEILEDERGRUPPER_OK = 'veiledergrupper_ny/OK';
export const NY_VEILEDERGRUPPER_FEILET = 'veiledergrupper_ny/FEILET';
export const NY_VEILEDERGRUPPER_PENDING = 'veiledergrupper_ny/PENDING';

export const SLETT_VEILEDERGRUPPER_OK = 'veiledergrupper_slette/OK';
export const SLETT_VEILEDERGRUPPER_FEILET = 'veiledergrupper_slette/FEILET';
export const SLETT_VEILEDERGRUPPER_PENDING = 'veiledergrupper_slette/PENDING';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
}

export interface LagretFilterState {
    status: string;
    data: LagretFilter[];
    error: VeilederGruppeError | null;
}

export interface RedigerGruppe {
    filterNavn: string;
    filterValg: FiltervalgModell;
    filterId: number;
}

export interface NyGruppe {
    filterNavn: string;
    filterValg: FiltervalgModell;
}

enum VeilederGruppeError {
    LAGRING_FEILET = 'LAGRING_FEILET',
    HENTING_FEILET = 'HENTING_FEILET',
    NY_FEILET = 'NY_FEILET',
    SLETTING_FEILET = 'SLETTING_FEILET'
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
    error: null
};

//  Reducer
export default function reducer(state: LagretFilterState = initialState, action) {
    switch (action.type) {
        case HENT_VEILEDERGRUPPER_PENDING:
        case NY_VEILEDERGRUPPER_PENDING:
        case REDIGER_VEILEDERGRUPPER_PENDING:
        case SLETT_VEILEDERGRUPPER_PENDING:
            return {...state, status: STATUS.PENDING};

        case HENT_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR, error: VeilederGruppeError.HENTING_FEILET};
        case NY_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR, error: VeilederGruppeError.NY_FEILET};
        case REDIGER_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR, error: VeilederGruppeError.LAGRING_FEILET};
        case SLETT_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR, error: VeilederGruppeError.SLETTING_FEILET};

        case HENT_VEILEDERGRUPPER_OK:
            return {...state, status: STATUS.OK, data: action.data};
        case NY_VEILEDERGRUPPER_OK:
            return {...state, status: STATUS.OK, data: state.data.concat(action.data)};
        case REDIGER_VEILEDERGRUPPER_OK:
            return {
                ...state, status: STATUS.OK, data: state.data.map(elem => {
                        if (elem.filterId !== action.data.filterId) {
                            return elem;
                        }
                        return action.data;
                    }
                )
            };
        case SLETT_VEILEDERGRUPPER_OK:
            return {
                ...state, status: STATUS.OK, data: state.data.filter(elem => elem.filterId !== action.data)
            };

        default:
            return state;
    }
}

// Action Creators
export function hentLagretFilterForEnhet(enhetId) {
    return doThenDispatch(() => hentEnhetsFilterGrupper(enhetId), {
        OK: HENT_VEILEDERGRUPPER_OK,
        FEILET: HENT_VEILEDERGRUPPER_FEILET,
        PENDING: HENT_VEILEDERGRUPPER_PENDING
    });
}

// Action Creators
export function lagreEndringer(endringer: RedigerGruppe, enhetId: string) {
    return doThenDispatch(() => redigerVeiledergruppe(endringer, enhetId), {
        OK: REDIGER_VEILEDERGRUPPER_OK,
        FEILET: REDIGER_VEILEDERGRUPPER_FEILET,
        PENDING: REDIGER_VEILEDERGRUPPER_PENDING
    });
}

// Action Creators
export function lageNyGruppe(endringer: NyGruppe, enhetId: string) {
    return doThenDispatch(() => nyVeiledergruppe(endringer, enhetId), {
        OK: NY_VEILEDERGRUPPER_OK,
        FEILET: NY_VEILEDERGRUPPER_FEILET,
        PENDING: NY_VEILEDERGRUPPER_PENDING
    });
}

// Action Creators
export function slettGruppe(enhet: string, filterId: number) {
    return doThenDispatch(() => slettVeiledergruppe(enhet, filterId), {
        OK: SLETT_VEILEDERGRUPPER_OK,
        FEILET: SLETT_VEILEDERGRUPPER_FEILET,
        PENDING: SLETT_VEILEDERGRUPPER_PENDING
    });
}
