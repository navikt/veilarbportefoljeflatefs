// Actions
export const SKJUL_MODAL = 'modal/skjul';
export const VIS_ARBEIDSLISTE_MODAL = 'LEGG_I_ARBEIDSLISTE/vis';
export const VIS_TILDELING_SUKSESS_MODAL = 'VEILEDER_TILORDNET/vis';
export const VIS_TILDEL_VEILEDER_MODAL = 'TILDEL_VEILEDER/vis';

export const VIS_FJERN_ARBEIDSLISTE_MODAL = 'FJERN_ARBEIDSLISTE/vis';

const initalState = {
    modal: undefined,
    brukere: [],
};

// Reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_MODAL:
            return initalState;
        case VIS_ARBEIDSLISTE_MODAL:
        case VIS_TILDELING_SUKSESS_MODAL:
        case VIS_TILDEL_VEILEDER_MODAL:
        case VIS_FJERN_ARBEIDSLISTE_MODAL:
            return {modal: action.type, brukere: action.data || []};
        default:
            return state;
    }
}

// Action Creators
export function visModal() {
    return {
        type: VIS_ARBEIDSLISTE_MODAL
    };
}

export function visFjernArbeidslisteModal() {
    return {
        type: VIS_FJERN_ARBEIDSLISTE_MODAL
    };
}

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
