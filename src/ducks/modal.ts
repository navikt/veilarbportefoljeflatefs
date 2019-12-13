// Actions
import { ToolbarPosisjon } from '../components/toolbar/toolbar';

export const SKJUL_MODAL = 'modal/skjul';
export const VIS_ARBEIDSLISTE_MODAL = 'LEGG_I_ARBEIDSLISTE/vis';
export const VIS_TILORDNING_SUKSESS_MODAL = 'VEILEDER_TILORDNET/vis';


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
        case VIS_TILORDNING_SUKSESS_MODAL:
            return { modal: action.type, brukere: action.data || []};
        default:
            return state;
    }
}

// Action Creators
export function visArbeidslisteModal(toolbarPosisjon?: ToolbarPosisjon) {
    return {
        type: VIS_ARBEIDSLISTE_MODAL,
        toolbarPosisjon
    };
}

// Action Creators
export function visTilordningOkModal(data) {
    return {
        type: VIS_TILORDNING_SUKSESS_MODAL,
        data
    };
}


export function skjulModal() {
    return {
        type: SKJUL_MODAL
    };
}
