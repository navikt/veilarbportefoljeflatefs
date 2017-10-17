
import { Dispatch } from 'redux';

export interface ContextState {
    nyEnhetModalSynlig: boolean;
    connected: boolean;
}

const initialState: ContextState = {
    nyEnhetModalSynlig: false,
    connected: false
};

enum ContextActionKeys {
    OPPDATER_AKTIV_ENHET = 'context/oppdater-aktiv-enhet',
    SETT_TILKOBLING_STATE = 'context/sett-tilkobling-state',
    LUKK_MODAL = 'context/lukk-modal'
}

interface NyContextAction {
    type: ContextActionKeys.OPPDATER_AKTIV_ENHET
        | ContextActionKeys.LUKK_MODAL;
}

interface ConnectionStateAction {
    type: ContextActionKeys.SETT_TILKOBLING_STATE;
    connected: boolean;
}

type ContextActions =
    | NyContextAction
    | ConnectionStateAction
    | { type: '__OTHER_ACTION__' };

export default function contextReducer(state: ContextState = initialState, action: ContextActions): ContextState {
    switch(action.type) {
        case ContextActionKeys.OPPDATER_AKTIV_ENHET:
            return { ...state, nyEnhetModalSynlig: true };
        case ContextActionKeys.LUKK_MODAL:
            return{ ...state, nyEnhetModalSynlig: false };
        case ContextActionKeys.SETT_TILKOBLING_STATE:
            return { ...state, connected: action.connected };
        default:
            return state;
    }
}

export function visAktivEnhetModal() {
    return (dispatch: Dispatch<NyContextAction>) => {
        dispatch({ type: ContextActionKeys.OPPDATER_AKTIV_ENHET });
    };
}

export function lukkAktivEnhetModal() {
    return (dispatch: Dispatch<NyContextAction>) => {
        dispatch({ type: ContextActionKeys.LUKK_MODAL });
    };
}

export function endreAktivEnhet() {
    return (dispatch: Dispatch<NyContextAction>) => {
        dispatch({ type: ContextActionKeys.LUKK_MODAL });
    };
}

export function beholdAktivEnhet() {
    return (dispatch: Dispatch<NyContextAction>) => {
        dispatch({ type: ContextActionKeys.LUKK_MODAL });
    };
}

export function settTilkoblingState(tilkoblet: boolean) {
    return (dispatch: Dispatch<ConnectionStateAction>) => {
        dispatch({ type: ContextActionKeys.SETT_TILKOBLING_STATE, connected: tilkoblet });
    };
}
