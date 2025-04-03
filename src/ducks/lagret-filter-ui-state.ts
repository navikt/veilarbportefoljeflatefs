import {OrNothing} from '../utils/types/types';
import {LagretFilter} from './lagret-filter';
import {OversiktType} from './ui/listevisning';

// Actions
export const VELG_MINE_FILTER = 'lagretfilter_velg/VELG_MINE_FILTER';
export const MARKER_MINE_FILTER = 'lagretfilter_velg/MARKER_MINE_FILTER';
export const AVMARKER_MINE_FILTER = 'lagretfilter_velg/AVMARKER_MINE_FILTER';
export const AVMARKER_SISTE_VALGT_MINE_FILTER = 'lagretfilter_velg/AVMARKER_SISTE_VALGT_MINE_FILTER';

export const MARKER_VEILEDER_GRUPPE = 'lagretfilter_velg/MARKER_VEILEDER_GRUPPE';
export const AVMARKER_VEILEDER_GRUPPE = 'lagretfilter_velg/AVMARKER_VEILEDER_GRUPPE';

export const APEN_MINE_FILTER_MODAL = 'lagretfilter_velg/APEN_MINE_FILTER_MODAL';
export const LUKK_MINE_FILTER_MODAL = 'lagretfilter_velg/LUKK_MINE_FILTER_MODAL';

export const APNE_FEIL_TILTAK_MODAL = 'lagretfilter_velg/APNE_FEIL_TILTAK_MODAL';
export const LUKK_FEIL_TILTAK_MODAL = 'lagretfilter_velg/LUKK_FEIL_TILTAK_MODAL';

export interface LagretFilterUIState {
    valgtMineFilter: OrNothing<LagretFilter>;
    valgtVeiledergruppe: OrNothing<LagretFilter>;
    sisteValgtMineFilter: OrNothing<number>;
    erModalApen: boolean;
    erFeilTiltakModalApen: boolean;
}

const initialState = {
    valgtMineFilter: null,
    valgtVeiledergruppe: null,
    sisteValgtMineFilter: null,
    erModalApen: false,
    erFeilTiltakModalApen: false
};

//  Reducer
export function lagretFilterUIStateReducer(state: LagretFilterUIState = initialState, action): LagretFilterUIState {
    switch (action.type) {
        case MARKER_MINE_FILTER:
            return {
                ...state,
                valgtMineFilter: action.data,
                sisteValgtMineFilter: action.data.filterId
            };
        case AVMARKER_MINE_FILTER:
            return {...state, valgtMineFilter: null};
        case AVMARKER_SISTE_VALGT_MINE_FILTER:
            return {...state, sisteValgtMineFilter: null};
        case MARKER_VEILEDER_GRUPPE:
            return {...state, valgtVeiledergruppe: action.data};
        case AVMARKER_VEILEDER_GRUPPE:
            return {...state, valgtVeiledergruppe: null};
        case APEN_MINE_FILTER_MODAL:
            return {...state, erModalApen: true};
        case LUKK_MINE_FILTER_MODAL:
            return {...state, erModalApen: false};
        case APNE_FEIL_TILTAK_MODAL:
            return {...state, erFeilTiltakModalApen: true};
        case LUKK_FEIL_TILTAK_MODAL:
            return {...state, erFeilTiltakModalApen: false};
        default:
            return state;
    }
}

// Action Creators
export function markerMineFilter(filterVerdi: LagretFilter, oversiktType: OversiktType) {
    return {
        type: MARKER_MINE_FILTER,
        data: filterVerdi,
        name: oversiktType
    };
}

export function markerValgtVeiledergruppe(filterVerdi: LagretFilter, oversiktType: OversiktType) {
    return {
        type: MARKER_VEILEDER_GRUPPE,
        data: filterVerdi,
        name: oversiktType
    };
}

export function avmarkerValgtMineFilter(oversiktType: OversiktType) {
    return {
        type: AVMARKER_MINE_FILTER,
        name: oversiktType
    };
}

export function avmarkerValgtVeiledergruppe(oversiktType: OversiktType) {
    return {
        type: AVMARKER_VEILEDER_GRUPPE,
        name: oversiktType
    };
}

export function avmarkerSisteValgtMineFilter(oversiktType: OversiktType) {
    return {
        type: AVMARKER_SISTE_VALGT_MINE_FILTER,
        name: oversiktType
    };
}

export function apneMineFilterModal(oversiktType: OversiktType) {
    return {
        type: APEN_MINE_FILTER_MODAL,
        name: oversiktType
    };
}

export function lukkMineFilterModal(oversiktType: OversiktType) {
    return {
        type: LUKK_MINE_FILTER_MODAL,
        name: oversiktType
    };
}
export function apneFeilTiltakModal(oversiktType: OversiktType) {
    return {
        type: APNE_FEIL_TILTAK_MODAL,
        name: oversiktType
    };
}

export function lukkFeilTiltakModal(oversiktType: OversiktType) {
    return {
        type: LUKK_FEIL_TILTAK_MODAL,
        name: oversiktType
    };
}
