// Actions
import { ToolbarPosisjon } from '../components/toolbar/toolbar';

export const SKJUL_MODAL = 'modal/skjul';
export const VIS_MODAL = 'modal/vis';

const initalState = {
    visModal: false
};

// Reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_MODAL:
            return { ...state, visModal: false };
        case VIS_MODAL:
            return { ...state, visModal: true };
        default:
            return state;
    }
}

// Action Creators
export function visModal(toolbarPosisjon?: ToolbarPosisjon) {
    return {
        type: VIS_MODAL,
        toolbarPosisjon
    };
}
export function skjulModal() {
    return {
        type: SKJUL_MODAL
    };
}
