import {OrNothing} from "../utils/types/types";
import {LagretFilter} from "./lagretFilter";

// Actions
export const MARKER_MINE_FILTER = 'lagretfilter_velg/MARKER_MINE_FILTER';
export const AVMARKER_MINE_FILTER = 'lagretfilter_velg/AVMARKER_MINE_FILTER';
export const AVMARKER_SISTE_VALGT_MINE_FILTER = 'lagretfilter_velg/AVMARKER_SISTE_VALGT_MINE_FILTER';

export const MARKER_VEILEDER_GRUPPE = 'lagretfilter_velg/MARKER_VEILEDER_GRUPPE';
export const AVMARKER_VEILEDER_GRUPPE = 'lagretfilter_velg/AVMARKER_VEILEDER_GRUPPE';

export const APEN_MINE_FILTER_MODAL = 'lagretfilter_velg/APEN_MINE_FILTER_MODAL';
export const LUKK_MINE_FILTER_MODAL = 'lagretfilter_velg/LUKK_MINE_FILTER_MODAL';

export const APEN_VEILEDER_GRUPPE_MODAL = 'lagretfilter_velg/APEN_VEILEDER_GRUPPE_MODAL';
export const LUKK_VEILEDER_GRUPPE_MODAL = 'lagretfilter_velg/LUKK_VEILEDER_GRUPPE_MODAL';


export interface LagretFilterUIState {
    valgtMineFilter: OrNothing<LagretFilter>;
    valgtVeilederGruppe: OrNothing<LagretFilter>;
    sisteValgtMineFilter: OrNothing<number>
    erMineFilterModalApen: boolean;
    erVeilederGruppeModalApen: boolean;
}

const initialState = {
    valgtMineFilter: null,
    valgtVeilederGruppe: null,
    sisteValgtMineFilter: null,
    erMineFilterModalApen: false,
    erVeilederGruppeModalApen: false
};

//  Reducer
export default function reducer(state: LagretFilterUIState = initialState, action): LagretFilterUIState {
    switch (action.type) {
        case
        MARKER_MINE_FILTER:
            return {...state, valgtMineFilter: action.data, sisteValgtMineFilter: action.data.filterId}
        case
        AVMARKER_MINE_FILTER:
            return {...state, valgtMineFilter: null}
        case
        AVMARKER_SISTE_VALGT_MINE_FILTER:
            return {...state, sisteValgtMineFilter: null}
        case
        MARKER_VEILEDER_GRUPPE:
            return {...state, valgtVeilederGruppe: action.data}
        case
        AVMARKER_VEILEDER_GRUPPE:
            return {...state, valgtVeilederGruppe: null}
        case
        APEN_MINE_FILTER_MODAL:
            return {...state, erMineFilterModalApen: true}
        case
        LUKK_MINE_FILTER_MODAL:
            return {...state, erMineFilterModalApen: false}
        case APEN_VEILEDER_GRUPPE_MODAL:
            return {...state, erVeilederGruppeModalApen: true}
        case LUKK_VEILEDER_GRUPPE_MODAL:
            return {...state, erVeilederGruppeModalApen: false}
        default:
            return state;
    }
}

// Action Creators
export function markerMineFilter(filterVerdi: LagretFilter, filtergruppe: string) {
    return {
        type: MARKER_MINE_FILTER,
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

export function avmarkerValgtMineFilter(filtergruppe: string) {
    return {
        type: AVMARKER_MINE_FILTER,
        name: filtergruppe
    }
}

export function avmarkerValgtVeilederGruppe(filtergruppe: string) {
    return {
        type: AVMARKER_VEILEDER_GRUPPE,
        name: filtergruppe
    }
}

export function avmarkerSisteValgtMineFilter(filtergruppe: string) {
    return {
        type: AVMARKER_SISTE_VALGT_MINE_FILTER,
        name: filtergruppe
    }
}

export function apneMineFilterModal(filtergruppe: string) {
    return {
        type: APEN_MINE_FILTER_MODAL,
        name: filtergruppe
    }
}

export function lukkMineFilterModal(filtergruppe: string) {
    return {
        type: LUKK_MINE_FILTER_MODAL,
        name: filtergruppe
    }
}

export function apneVeilederGruppeModal(filtergruppe: string) {
    return {
        type: APEN_VEILEDER_GRUPPE_MODAL,
        name: filtergruppe
    }
}

export function lukkVeilederGruppeModal(filtergruppe: string) {
    return {
        type: LUKK_VEILEDER_GRUPPE_MODAL,
        name: filtergruppe
    }
}

