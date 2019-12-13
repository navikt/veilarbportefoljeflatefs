// Actions
export const SKJUL_FEILMELDING_MODAL = 'feilmelding-modal/skjul';
export const VIS_FEILMELDING_MODAL = 'feilmelding-modal/vis';

export const TILORDNING_FEILET = 'tilordningFeilet';
export const LEGG_TIL_ARBEIDSLISTE_FEILET = 'leggTilArbeidslisteFeilet';
export const FJERN_FRA_ARBEIDSLISTE_FEILET = 'fjernFraArbeidslisteFeilet';

// Reducer
const initalState = {
    aarsak: undefined,
    brukereError: [],
    brukereOk: []
};
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_FEILMELDING_MODAL:
            return { ...initalState };
        case VIS_FEILMELDING_MODAL:
            return { ...action.data };
        default:
            return state;
    }
}

// Action Creators
export function visFeiletModal(data) {
    return (dispatch) => dispatch({
        type: VIS_FEILMELDING_MODAL,
        data
    });
}

export function skjulFeilmeldingModal() {
    return (dispatch) => dispatch({
        type: SKJUL_FEILMELDING_MODAL
    });
}

