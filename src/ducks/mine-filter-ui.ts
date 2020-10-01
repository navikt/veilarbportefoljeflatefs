import {OrNothing} from "../utils/types/types";
import {Filter} from "./filter";

// Actions
export const VELG_MINE_FILTER = 'minefilter_velg/VELG_MINE_FILTER';
export const MARKER_MINE_FILTER = 'minefilter_velg/MARKER_MINE_FILTER';
export const AVMARKER_MINE_FILTER = 'minefilter_velg/AVMARKER_MINE_FILTER';
export const AVMARKER_SISTE_VALGT_FILTER = 'minefilter_velg/AVMARKER_SISTE_VALGT_FILTER';

export const MARKER_VEILEDER_GRUPPE = 'minefilter_velg/MARKER_VEILEDER_GRUPPE';
export const AVMARKER_VEILEDER_GRUPPE = 'minefilter_velg/AVMARKER_VEILEDER_GRUPPE';

export const APEN_LAGRE_FILTER_MODAL = 'minefilter_velg/APEN_MINE_FILTER_MODAL';
export const LUKK_LAGRE_FILTER_MODAL = 'minefilter_velg/LUKK_MINE_FILTER_MODAL';


export interface FilterUIState {
    valgtFilter: OrNothing<Filter>;
    valgtVeilederGruppe: OrNothing<Filter>;
    sisteValgteFilter: OrNothing<number>
    erModalApen: boolean;
}


const initialState = {
    valgtFilter: null,
    valgtVeilederGruppe: null,
    sisteValgteFilter: null,
    erModalApen: false,
};

//  Reducer
export default function reducer(state: FilterUIState = initialState, action): FilterUIState {
    switch (action.type) {
        case
        MARKER_MINE_FILTER:
            return {...state, valgtFilter: action.data, sisteValgteFilter: action.data.filterId}
        case
        AVMARKER_MINE_FILTER:
            return {...state, valgtFilter: null}
        case
        AVMARKER_SISTE_VALGT_FILTER:
            return {...state, sisteValgteFilter: null}
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
export function markerValgtFilter(filterVerdi: Filter, filtergruppe: string) {
    return {
        type: MARKER_MINE_FILTER,
        data: filterVerdi,
        name: filtergruppe
    }
}

export function markerValgtVeilederGruppe(filterVerdi: Filter, filtergruppe: string) {
    return {
        type: MARKER_VEILEDER_GRUPPE,
        data: filterVerdi,
        name: filtergruppe
    }
}

export function avmarkerValgtFilter(filtergruppe: string) {
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

export function avmarkerSisteValgtFilter(filtergruppe: string) {
    return {
        type: AVMARKER_SISTE_VALGT_FILTER,
        name: filtergruppe
    }
}

export function apneMineFilterModal(filtergruppe: string) {
    return {
        type: APEN_LAGRE_FILTER_MODAL,
        name: filtergruppe
    }
}

export function lukkMineFilterModal(filtergruppe: string) {
    return {
        type: LUKK_LAGRE_FILTER_MODAL,
        name: filtergruppe
    }
}

