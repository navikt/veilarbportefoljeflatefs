import {SesjonStatus} from '../model-interfaces';
import {DataAction} from './types';

type SesjonStatusDataAction = DataAction<SesjonStatusAction, SesjonStatus>;

export interface SesjonStatusState {
    data?: SesjonStatus | null;
}

const initalStatusState: SesjonStatusState = {
    data: null
};

// Actions
export enum SesjonStatusAction {
    OPPDATER_SESJON_STATUS = 'veilarbportefoljeflatefs/informasjonsmelding/SETT_SESJON_STATUS'
}

// Reducer
export function informasjonsmeldingReducer(
    state: SesjonStatusState = initalStatusState,
    action: SesjonStatusDataAction
): SesjonStatusState {
    switch (action.type) {
        case SesjonStatusAction.OPPDATER_SESJON_STATUS:
            return {...state, data: action.data};
        default:
            return state;
    }
}

// Action Creators
const oppdaterSesjonStatus = (status: SesjonStatus): SesjonStatusDataAction => {
    return {type: SesjonStatusAction.OPPDATER_SESJON_STATUS, data: status};
};

export const settSesjonStatusUtlopt = (): SesjonStatusDataAction => oppdaterSesjonStatus(SesjonStatus.UTLOPT);
export const settSesjonStatusGyldig = (): SesjonStatusDataAction => oppdaterSesjonStatus(SesjonStatus.GYLDIG);
