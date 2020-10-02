import {OrNothing} from "../utils/types/types";
import {LagretFilter} from "./lagretFilter";

// Actions
export const VELG_LAGRET_FILTER = 'lagretfilter_velg/VELG_LAGRET_FILTER';
export const MARKER_LAGRET_FILTER = 'lagretfilter_velg/MARKER_LAGRET_FILTER';
export const AVMARKER_LAGRET_FILTER = 'lagretfilter_velg/AVMARKER_LAGRET_FILTER';
export const AVMARKER_SISTE_VALGT_LAGRET_FILTER = 'lagretfilter_velg/AVMARKER_SISTE_VALGT_FILTER';

export const MARKER_VEILEDER_GRUPPE = 'lagretfilter_velg/MARKER_VEILEDER_GRUPPE';
export const AVMARKER_VEILEDER_GRUPPE = 'lagretfilter_velg/AVMARKER_VEILEDER_GRUPPE';

export const APEN_LAGRE_FILTER_MODAL = 'lagretfilter_velg/APEN_LAGRE_FILTER_MODAL';
export const LUKK_LAGRE_FILTER_MODAL = 'lagretfilter_velg/LUKK_LAGRE_FILTER_MODAL';


export interface LagretFilterUIState {
    valgtLagretFilter: OrNothing<LagretFilter>;
    valgtVeilederGruppe: OrNothing<LagretFilter>;
    sisteValgtLagretFilter: OrNothing<number>
    erModalApen: boolean;
}

const initialState = {
    valgtLagretFilter: null,
    valgtVeilederGruppe: null,
    sisteValgtLagretFilter: null,
    erModalApen: false,
};

//  Reducer
export default function reducer(state: LagretFilterUIState = initialState, action): LagretFilterUIState {
    switch (action.type) {
        case
        MARKER_LAGRET_FILTER:
            return {...state, valgtLagretFilter: action.data, sisteValgtLagretFilter: action.data.filterId}
        case
        AVMARKER_LAGRET_FILTER:
            return {...state, valgtLagretFilter: null}
        case
        AVMARKER_SISTE_VALGT_LAGRET_FILTER:
            return {...state, sisteValgtLagretFilter: null}
        case
        MARKER_VEILEDER_GRUPPE:
            return {...state, valgtVeilederGruppe: action.data}
        case
        AVMARKER_VEILEDER_GRUPPE:
            return {...state, valgtVeilederGruppe: null}
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
export function markerValgtLagretFilter(filterVerdi: LagretFilter, filtergruppe: string) {
    return {
        type: MARKER_LAGRET_FILTER,
        data: filterVerdi,
        name: filtergruppe
    }
}

export function markerValgtVeilederGruppe(filterVerdi: LagretFilter, filtergruppe: string) {
    return {
        type: MARKER_VEILEDER_GRUPPE,
        data: filterVerdi,
        name: filtergruppe
    }
}

export function avmarkerValgtLagretFilter(filtergruppe: string) {
    return {
        type: AVMARKER_LAGRET_FILTER,
        name: filtergruppe
    }
}

export function avmarkerValgtVeilederGruppe(filtergruppe: string) {
    return {
        type: AVMARKER_VEILEDER_GRUPPE,
        name: filtergruppe
    }
}

export function avmarkerSisteValgtLagretFilter(filtergruppe: string) {
    return {
        type: AVMARKER_SISTE_VALGT_LAGRET_FILTER,
        name: filtergruppe
    }
}

export function apneLagreFilterModal(filtergruppe: string) {
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

