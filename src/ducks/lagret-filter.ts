import {doThenDispatch, STATUS} from './utils';
import {FiltervalgModell} from '../model-interfaces';
import {OrNothing} from "../utils/types/types";
import {hentMineLagredeFilter, nyttLagretFilter, redigerLagretFilter, slettLagretFilter} from "../middleware/api";

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

export const VELG_LAGRET_FILTER = 'lagredefilter_velg/VELG_LAGRET_FILTER';
export const MARKER_LAGRET_FILTER = 'lagredefilter_velg/MARKER_LAGRET_FILTER';
export const AVMARKER_LAGRET_FILTER = 'lagredefilter_velg/AVMARKER_LAGRET_FILTER';
export const AVMARKER_SISTE_VALGT_FILTER = 'lagredefilter_velg/AVMARKER_SISTE_VALGT_FILTER';

export const APEN_LAGRE_FILTER_MODAL = 'lagredefilter_velg/APEN_LAGRE_FILTER_MODAL';
export const LUKK_LAGRE_FILTER_MODAL = 'lagredefilter_velg/LUKK_LAGRE_FILTER_MODAL';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    opprettetDato: Date;
}

export interface LagretFilterState {
    status: string;
    data: LagretFilter[];
    valgtLagretFilter: OrNothing<LagretFilter>;
    sisteValgteLagredeFilter: OrNothing<number>
    handlingType: HandlingsType | null;
    erModalApen: boolean;
}

export interface RedigerFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
    filterId: number;
}

export interface NyttFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
}

export enum HandlingsType {
    NYTT,
    REDIGERE,
    SLETTE,
    HENTE
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
    valgtLagretFilter: null,
    handlingType: null,
    sisteValgteLagredeFilter: null,
    erModalApen: false,
};

//  Reducer
export default function reducer(state: LagretFilterState = initialState, action) {
    switch (action.type) {
        case HENT_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.HENTE};
        case NY_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.NYTT};
        case REDIGER_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.REDIGERE};
        case SLETT_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.SLETTE};
        case HENT_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.HENTE};
        case NY_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.NYTT};
        case REDIGER_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.REDIGERE};
        case SLETT_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.SLETTE};
        case HENT_LAGREDEFILTER_OK:
            return {...state, status: STATUS.OK, data: action.data, handlingType: HandlingsType.HENTE};
        case NY_LAGREDEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.NYTT,
                data: state.data.concat(action.data)
            };
        case
        REDIGER_LAGREDEFILTER_OK:
            return {
                ...state, status: STATUS.OK, handlingType: HandlingsType.REDIGERE, data: state.data.map(elem => {
                        if (elem.filterId !== action.data.filterId) {
                            return elem;
                        }
                        return action.data;
                    }
                )
            };
        case
        SLETT_LAGREDEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.SLETTE,
                valgtLagretFilter: null,
                sisteValgteLagredeFilter: null,
                data: state.data.filter(elem => elem.filterId !== action.data)
            };
        case
        MARKER_LAGRET_FILTER:
            return {...state, valgtLagretFilter: action.data, sisteValgteLagredeFilter: action.data.filterId}
        case
        AVMARKER_LAGRET_FILTER:
            return {...state, valgtLagretFilter: null}
        case
        AVMARKER_SISTE_VALGT_FILTER:
            return {...state, sisteValgteLagredeFilter: null}
        case
        APEN_LAGRE_FILTER_MODAL:
            return {...state, erModalApen: true}
        case
        LUKK_LAGRE_FILTER_MODAL:
            return {...state, erModalApen: false}
        default:
            return state;
    }
}

// Action Creators
export function markerVelgtFilter(filterVerdi: LagretFilter) {
    return {
        type: MARKER_LAGRET_FILTER,
        data: filterVerdi,
        name: 'veileder'
    }
}

export function avmarkerVelgtFilter() {
    return {
        type: AVMARKER_LAGRET_FILTER,
        name: 'veileder'
    }
}

export function avmarkerSisteVelgtFilter() {
    return {
        type: AVMARKER_SISTE_VALGT_FILTER,
        name: 'veileder'
    }
}

export function apenLagreFilterModal() {
    return {
        type: APEN_LAGRE_FILTER_MODAL,
        name: 'veileder'
    }
}

export function lukkLagreFilterModal() {
    return {
        type: LUKK_LAGRE_FILTER_MODAL,
        name: 'veileder'
    }
}

export function hentLagredeFilterForVeileder() {
    return doThenDispatch(() => hentMineLagredeFilter(), {
        OK: HENT_LAGREDEFILTER_OK,
        FEILET: HENT_LAGREDEFILTER_FEILET,
        PENDING: HENT_LAGREDEFILTER_PENDING
    });
}

export function lagreEndringer(endringer: RedigerFilter) {
    return doThenDispatch(() => redigerLagretFilter(endringer), {
        OK: REDIGER_LAGREDEFILTER_OK,
        FEILET: REDIGER_LAGREDEFILTER_FEILET,
        PENDING: REDIGER_LAGREDEFILTER_PENDING
    });
}

export function lagreNyttFilter(nyttFilter: NyttFilter) {
    return doThenDispatch(() => nyttLagretFilter(nyttFilter), {
        OK: NY_LAGREDEFILTER_OK,
        FEILET: NY_LAGREDEFILTER_FEILET,
        PENDING: NY_LAGREDEFILTER_PENDING
    });
}

export function slettFilter(filterId: number) {
    return doThenDispatch(() => slettLagretFilter(filterId), {
        OK: SLETT_LAGREDEFILTER_OK,
        FEILET: SLETT_LAGREDEFILTER_FEILET,
        PENDING: SLETT_LAGREDEFILTER_PENDING
    });
}
