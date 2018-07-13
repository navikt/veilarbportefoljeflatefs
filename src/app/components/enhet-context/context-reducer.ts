import { EnhetConnectionState } from './enhet-context-listener';

export interface ContextState {
    connected: EnhetConnectionState;
    aktivEnhetId: string;
    isPending: boolean;
    visFeilmodal: boolean;
}

const initialState: ContextState = {
    connected: EnhetConnectionState.NOT_CONNECTED,
    aktivEnhetId: '',
    isPending: false,
    visFeilmodal: false
};

enum ContextActionKeys {
    SETT_TILKOBLING_STATE = 'context/sett-tilkobling-state',
    SETT_AKTIV_ENHET = 'context/sett-aktiv-enhet',
    SETT_PENDING_STATE = 'context/sett-pending',
    VIS_FEILMODAL = 'context/vis-feilmodal',
    SKJUL_FEILMODAL = 'context/skjul-feilmodal'
}

interface SettAktivEnhetAction {
    type: ContextActionKeys.SETT_AKTIV_ENHET;
    enhet: string;
}

interface FeilmodalAction {
    type: ContextActionKeys.VIS_FEILMODAL | ContextActionKeys.SKJUL_FEILMODAL;
}

interface SettPendingAction {
    type: ContextActionKeys.SETT_PENDING_STATE;
    pending: boolean;
}

interface ConnectionStateAction {
    type: ContextActionKeys.SETT_TILKOBLING_STATE;
    connected: EnhetConnectionState;
}

interface VisFeilmodalAction {
    type: ContextActionKeys.VIS_FEILMODAL;
}

interface SkjulFeilmodalAction {
    type: ContextActionKeys.SKJUL_FEILMODAL;
}

type ContextActions =
    | SettAktivEnhetAction
    | ConnectionStateAction
    | SettPendingAction
    | VisFeilmodalAction
    | SkjulFeilmodalAction
    | { type: '__OTHER_ACTION__' };

export default function contextReducer(state: ContextState = initialState, action: ContextActions): ContextState {
    switch(action.type) {
        case ContextActionKeys.SETT_TILKOBLING_STATE:
            return { ...state, connected: action.connected };
        case ContextActionKeys.SETT_AKTIV_ENHET:
            return { ...state, aktivEnhetId: action.enhet };
        case ContextActionKeys.SETT_PENDING_STATE:
            return { ...state, isPending: action.pending };
        case ContextActionKeys.VIS_FEILMODAL:
            return { ...state, visFeilmodal: true };
        case ContextActionKeys.SKJUL_FEILMODAL:
            return { ...state, visFeilmodal: false };
        default:
            return state;
    }
}

export function settIsPending(pending: boolean): SettPendingAction {
    return { type: ContextActionKeys.SETT_PENDING_STATE, pending };
}

export function settNyAktivEnhet(nyAktivEnhet: string): SettAktivEnhetAction {
    return { type: ContextActionKeys.SETT_AKTIV_ENHET, enhet: nyAktivEnhet };
}

export function settTilkoblingState(tilkoblet: EnhetConnectionState): ConnectionStateAction {
    return { type: ContextActionKeys.SETT_TILKOBLING_STATE, connected: tilkoblet };
}

export function visFeilmodal(): FeilmodalAction {
    return { type: ContextActionKeys.VIS_FEILMODAL };
}

export function skjulFeilmodal(): FeilmodalAction {
    return { type: ContextActionKeys.SKJUL_FEILMODAL };
}
