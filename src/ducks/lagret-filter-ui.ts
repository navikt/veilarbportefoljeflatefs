import {OrNothing} from "../utils/types/types";
import {MineFilter} from "./mine-filter";

// Actions
export const VELG_MINE_FILTER = 'minefilter_velg/VELG_MINE_FILTER';
export const MARKER_MINE_FILTER = 'minefilter_velg/MARKER_MINE_FILTER';
export const AVMARKER_MINE_FILTER = 'minefilter_velg/AVMARKER_MINE_FILTER';
export const AVMARKER_SISTE_VALGT_FILTER = 'minefilter_velg/AVMARKER_SISTE_VALGT_FILTER';

export const APEN_LAGRE_FILTER_MODAL = 'minefilter_velg/APEN_MINE_FILTER_MODAL';
export const LUKK_LAGRE_FILTER_MODAL = 'minefilter_velg/LUKK_MINE_FILTER_MODAL';


export interface MineFilterUIState {
    valgtMineFilter: OrNothing<MineFilter>;
    sisteValgteMineFilter: OrNothing<number>
    erModalApen: boolean;
}


const initialState = {
    valgtMineFilter: null,
    sisteValgteMineFilter: null,
    erModalApen: false,
};

//  Reducer
export default function reducer(state: MineFilterUIState = initialState, action): MineFilterUIState {
    switch (action.type) {
        case
        MARKER_MINE_FILTER:
            return {...state, valgtMineFilter: action.data, sisteValgteMineFilter: action.data.filterId}
        case
        AVMARKER_MINE_FILTER:
            return {...state, valgtMineFilter: null}
        case
        AVMARKER_SISTE_VALGT_FILTER:
            return {...state, sisteValgteMineFilter: null}
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
export function markerValgtFilter(filterVerdi: MineFilter, filtergruppe: string) {
    return {
        type: MARKER_MINE_FILTER,
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

