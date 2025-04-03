// Actions
export const SKJUL_SERVERFEIL_MODAL = 'serverfeil-modal/skjul';
export const VIS_SERVERFEIL_MODAL = 'serverfeil-modal/vis';
export const SLETTING_FEILET_MODAL = 'veiledergrupper_slette/FEILET';
export const REDIGERING_FEILET_MODAL = 'veiledergrupper_endre/FEILET';
export const NY_FEILET_MODAL = 'veiledergrupper_ny/FEILET';

// Reducer
const initalState = {
    aarsak: undefined,
    brukereError: []
};

export function serverfeilModalReducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_SERVERFEIL_MODAL:
            return {...initalState};
        case SLETTING_FEILET_MODAL:
        case REDIGERING_FEILET_MODAL:
        case NY_FEILET_MODAL:
        case VIS_SERVERFEIL_MODAL:
            return {aarsak: action.type};
        default:
            return state;
    }
}

// Action Creators
export function visServerfeilModal() {
    return dispatch =>
        dispatch({
            type: VIS_SERVERFEIL_MODAL
        });
}

export function skjulServerfeilModal() {
    return dispatch =>
        dispatch({
            type: SKJUL_SERVERFEIL_MODAL
        });
}
