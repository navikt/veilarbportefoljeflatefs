import { getEnhetFromUrl } from '../../utils/utils';

export interface ContextState {
    connected: boolean;
    aktivEnhet: string;
}

const initialState: ContextState = {
    connected: false,
    aktivEnhet: getEnhetFromUrl()
};

enum ContextActionKeys {
    SETT_TILKOBLING_STATE = 'context/sett-tilkobling-state',
    SETT_AKTIV_ENHET = 'context/sett-aktiv-enhet',
}

interface SettAktivEnhetAction {
    type: ContextActionKeys.SETT_AKTIV_ENHET;
    enhet: string;
}

interface ConnectionStateAction {
    type: ContextActionKeys.SETT_TILKOBLING_STATE;
    connected: boolean;
}

type ContextActions =
    | SettAktivEnhetAction
    | ConnectionStateAction
    | { type: '__OTHER_ACTION__' };

export default function contextReducer(state: ContextState = initialState, action: ContextActions): ContextState {
    switch(action.type) {
        case ContextActionKeys.SETT_TILKOBLING_STATE:
            return { ...state, connected: action.connected };
        case ContextActionKeys.SETT_AKTIV_ENHET:
            return { ...state, aktivEnhet: action.enhet };
        default:
            return state;
    }
}

export function settNyAktivEnhet(nyAktivEnhet: string): SettAktivEnhetAction {
    return { type: ContextActionKeys.SETT_AKTIV_ENHET, enhet: nyAktivEnhet };
}

export function settTilkoblingState(tilkoblet: boolean): ConnectionStateAction {
    return { type: ContextActionKeys.SETT_TILKOBLING_STATE, connected: tilkoblet };
}
