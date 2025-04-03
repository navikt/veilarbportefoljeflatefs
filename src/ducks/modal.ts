// Actions
export const SKJUL_MODAL = 'modal/skjul';
export const VIS_TILDELING_SUKSESS_MODAL = 'VEILEDER_TILORDNET/vis';
export const VIS_TILDEL_VEILEDER_MODAL = 'TILDEL_VEILEDER/vis';

const initalState = {
    modal: undefined,
    brukere: []
};

// Reducer
export function modalReducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_MODAL:
            return initalState;
        case VIS_TILDELING_SUKSESS_MODAL:
        case VIS_TILDEL_VEILEDER_MODAL:
            return {modal: action.type, brukere: action.data || []};
        default:
            return state;
    }
}

// Action Creators

export function visTildelVeilederModal() {
    return {
        type: VIS_TILDEL_VEILEDER_MODAL
    };
}

// Action Creators
export function visTilordningOkModal(data) {
    return {
        type: VIS_TILDELING_SUKSESS_MODAL,
        data
    };
}

export function skjulModal() {
    return {
        type: SKJUL_MODAL
    };
}
