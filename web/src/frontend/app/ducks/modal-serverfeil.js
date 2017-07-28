// Actions
export const SKJUL_SERVERFEIL_MODAL = 'serverfeil-modal/skjul';
export const VIS_SERVERFEIL_MODAL = 'serverfeil-modal/vis';

// Reducer
const initalState = {
    modalVises: false
};
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_SERVERFEIL_MODAL:
            return { ...initalState };
        case VIS_SERVERFEIL_MODAL:
            return { modalVises: true };
        default:
            return state;
    }
}

// Action Creators
export function visServerfeilModal() {
    return (dispatch) => dispatch({
        type: VIS_SERVERFEIL_MODAL
    });
}

export function skjulServerfeilModal() {
    return (dispatch) => dispatch({
        type: SKJUL_SERVERFEIL_MODAL
    });
}

