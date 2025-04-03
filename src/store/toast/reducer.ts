import {ToastAction, ToastActionType} from './actions';
import {OrNothing} from '../../utils/types/types';

export interface ToastState {
    toasts: OrNothing<ToastActionType>;
}

const initialState: ToastState = {
    toasts: null
};

export const toastReducer = (state: ToastState = initialState, action: ToastAction): ToastState => {
    switch (action.type) {
        case ToastActionType.VIS_OPPRETT_GRUPPE_TOAST:
        case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.VIS_SLETTE_GRUPPE_TOAST:
        case ToastActionType.VIS_INGEN_ENDRINGER_TOAST:
        case ToastActionType.VIS_LAGRE_SORTERING_TOAST:
        case ToastActionType.VIS_SORTERING_FEILET_TOAST:
            return {toasts: action.type};
        case ToastActionType.FJERN_OPPRETT_GRUPPE_TOAST:
        case ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.FJERN_SLETTE_GRUPPE_TOAST:
        case ToastActionType.FJERN_INGEN_ENDRINGER_TOAST:
        case ToastActionType.FJERN_SORTERING_TOAST:
            return {toasts: null};
        default:
            return state;
    }
};
