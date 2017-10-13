
import {Action, Dispatch} from 'redux';

export interface ContextState {
    nyEnhetModalSynlig: boolean;
}

const initialState: ContextState = {
    nyEnhetModalSynlig: false,
};

enum ContextActionKeys {
    OPPDATER_AKTIV_ENHET = 'context/oppdater-aktiv-enhet',
    LUKK_MODAL = 'context/lukk-modal'
}

interface NyContextAction {
    type: ContextActionKeys.OPPDATER_AKTIV_ENHET
        | ContextActionKeys.LUKK_MODAL;
}

type ContextActions =
    | NyContextAction
    | { type: '__OTHER_ACTION__' }

export default function contextReducer(state: ContextState = initialState, action: ContextActions): ContextState {
    switch(action.type) {
        case ContextActionKeys.OPPDATER_AKTIV_ENHET:
            return { ...state, nyEnhetModalSynlig: true };
        case ContextActionKeys.LUKK_MODAL:
            return{ ...state, nyEnhetModalSynlig: false };
        default:
            return state;
    }
}

export function visAktivEnhetModal() {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: ContextActionKeys.OPPDATER_AKTIV_ENHET });
    }
}

export function endreAktivEnhet() {
    return (dispatch: Dispatch<Action>) => {

    }
}

export function beholdAktivEnhet() {
    return (dispatch: Dispatch<Action>) => {

    }
}
