import {AppState} from '../../../reducer';

export function selectSide(state: AppState): number {
    return state.paginering.side;
}

export function selectSeFlere(state: AppState): boolean {
    return state.paginering.seFlere;
}

export function selectSideStorrelse(state: AppState): number {
    return state.paginering.sideStorrelse;
}

export function selectFraIndex(state: AppState): number {
    // paginering starts at 1 not 0
    return (selectSide(state) - 1) * selectSideStorrelse(state);
}
