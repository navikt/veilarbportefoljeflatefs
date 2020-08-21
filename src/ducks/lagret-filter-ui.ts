import {OrNothing} from "../utils/types/types";
import {LagretFilter, SLETT_LAGREDEFILTER_OK} from "./lagret-filter";

// Actions
export const VELG_LAGRET_FILTER = 'lagredefilter_velg/VELG_LAGRET_FILTER';
export const MARKER_LAGRET_FILTER = 'lagredefilter_velg/MARKER_LAGRET_FILTER';
export const AVMARKER_LAGRET_FILTER = 'lagredefilter_velg/AVMARKER_LAGRET_FILTER';
export const AVMARKER_SISTE_VALGT_FILTER = 'lagredefilter_velg/AVMARKER_SISTE_VALGT_FILTER';

export const APEN_LAGRE_FILTER_MODAL = 'lagredefilter_velg/APEN_LAGRE_FILTER_MODAL';
export const LUKK_LAGRE_FILTER_MODAL = 'lagredefilter_velg/LUKK_LAGRE_FILTER_MODAL';


export interface LagretFilterUIState {
    valgtLagretFilter: OrNothing<LagretFilter>;
    sisteValgteLagredeFilter: OrNothing<number>
    erModalApen: boolean;
}


const initialState = {
    valgtLagretFilter: null,
    sisteValgteLagredeFilter: null,
    erModalApen: false,
};

//  Reducer
export default function reducer(state: LagretFilterUIState = initialState, action):LagretFilterUIState {
    switch (action.type) {
        case
        SLETT_LAGREDEFILTER_OK:
            return {
                ...state,
                valgtLagretFilter: null,
                sisteValgteLagredeFilter: null
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
export function markerVelgtFilter(filterVerdi: LagretFilter, filtergruppe: string) {
    return {
        type: MARKER_LAGRET_FILTER,
        data: filterVerdi,
        name: filtergruppe
    }
}

export function avmarkerVelgtFilter(filtergruppe: string) {
    return {
        type: AVMARKER_LAGRET_FILTER,
        name: filtergruppe
    }
}

export function avmarkerSisteVelgtFilter(filtergruppe: string) {
    return {
        type: AVMARKER_SISTE_VALGT_FILTER,
        name: filtergruppe
    }
}

export function apenLagreFilterModal(filtergruppe: string) {
    return {
        type: APEN_LAGRE_FILTER_MODAL,
        name: filtergruppe
    }
}

export function lukkLagreFilterModal(filtergruppe: string) {
    return {
        type: LUKK_LAGRE_FILTER_MODAL,
        name: filtergruppe
    }
}

