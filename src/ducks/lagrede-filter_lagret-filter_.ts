import { STATUS, doThenDispatch } from './utils';
import { FiltervalgModell } from '../model-interfaces';
import {hentEnhetsFilterGrupper, nyVeiledergruppe, redigerVeiledergruppe, slettVeiledergruppe} from "../middleware/api";

// Actions
export const HENT_LAGREDEFILTER_OK = 'lagredefilter/OK';
export const HENT_LAGREDEFILTER_FEILET = 'lagredefilter/FEILET';
export const HENT_LAGREDEFILTER_PENDING = 'lagredefilter/PENDING';

export const REDIGER_LAGREDEFILTER_OK = 'lagredefilter_endre/OK';
export const REDIGER_LAGREDEFILTER_FEILET = 'lagredefilter_endre/FEILET';
export const REDIGER_LAGREDEFILTER_PENDING = 'lagredefilter_endre/PENDING';

export const NY_LAGREDEFILTER_OK = 'lagredefilter_ny/OK';
export const NY_LAGREDEFILTER_FEILET = 'lagredefilter_ny/FEILET';
export const NY_LAGREDEFILTER_PENDING = 'lagredefilter_ny/PENDING';

export const SLETT_LAGREDEFILTER_OK = 'lagredefilter_slette/OK';
export const SLETT_LAGREDEFILTER_FEILET = 'lagredefilter_slette/FEILET';
export const SLETT_LAGREDEFILTER_PENDING = 'lagredefilter_slette/PENDING';

export interface LagretFilter_LagredeFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    opprettetDato: Date;
}

export interface LagretFilterState {
    status: string;
    data: LagretFilter_LagredeFilter[];
    error: LagretFilterError | null;
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

enum LagretFilterError {
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
        case HENT_LAGREDEFILTER_PENDING:
        case NY_LAGREDEFILTER_PENDING:
        case REDIGER_LAGREDEFILTER_PENDING:
        case SLETT_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING};
        case HENT_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, error: LagretFilterError.HENTING_FEILET};
        case NY_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, error: LagretFilterError.NY_FEILET};
        case REDIGER_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, error: LagretFilterError.LAGRING_FEILET};
        case SLETT_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, error: LagretFilterError.SLETTING_FEILET};

        case HENT_LAGREDEFILTER_OK:
            return {...state, status: STATUS.OK, data: action.data};
        case NY_LAGREDEFILTER_OK:
            return {...state, status: STATUS.OK, data: state.data.concat(action.data)};
        case REDIGER_LAGREDEFILTER_OK:
            return {
                ...state, status: STATUS.OK, data: state.data.map(elem => {
                        if (elem.filterId !== action.data.filterId) {
                            return elem;
                        }
                        return action.data;
                    }
                )
            };
        case SLETT_LAGREDEFILTER_OK:
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
        OK: HENT_LAGREDEFILTER_OK,
        FEILET: HENT_LAGREDEFILTER_FEILET,
        PENDING: HENT_LAGREDEFILTER_PENDING
    });
}

// Action Creators
export function lagreEndringer(endringer: RedigerGruppe, enhetId: string) {
    return doThenDispatch(() => redigerVeiledergruppe(endringer, enhetId), {
        OK: REDIGER_LAGREDEFILTER_OK,
        FEILET: REDIGER_LAGREDEFILTER_FEILET,
        PENDING: REDIGER_LAGREDEFILTER_PENDING
    });
}

// Action Creators
export function lageNyGruppe(endringer: NyGruppe, enhetId: string) {
    return doThenDispatch(() => nyVeiledergruppe(endringer, enhetId), {
        OK: NY_LAGREDEFILTER_OK,
        FEILET: NY_LAGREDEFILTER_FEILET,
        PENDING: NY_LAGREDEFILTER_PENDING
    });
}

// Action Creators
export function slettGruppe(enhet: string, filterId: number) {
    return doThenDispatch(() => slettVeiledergruppe(enhet, filterId), {
        OK: SLETT_LAGREDEFILTER_OK,
        FEILET: SLETT_LAGREDEFILTER_FEILET,
        PENDING: SLETT_LAGREDEFILTER_PENDING
    });
}
