// Actions
export const SKJUL_FEILMELDING_MODAL = 'feilmelding-modal/skjul';
export const VIS_FEILMELDING_MODAL = 'feilmelding-modal/vis';

export const TILDELING_FEILET = 'tilordningFeilet';

// Reducer
const initalState = {
    aarsak: undefined,
    brukereError: []
};
export function feilmedlingModalReducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_FEILMELDING_MODAL:
            return {...initalState};
        case VIS_FEILMELDING_MODAL:
            return {...action.data};
        default:
            return state;
    }
}

// Action Creators
export function visFeiletModal(data) {
    return dispatch =>
        dispatch({
            type: VIS_FEILMELDING_MODAL,
            data
        });
}

export function skjulFeilmeldingModal() {
    return dispatch =>
        dispatch({
            type: SKJUL_FEILMELDING_MODAL
        });
}
