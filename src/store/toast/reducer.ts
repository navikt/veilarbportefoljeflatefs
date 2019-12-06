import { ToastAction, ToastActionType } from './actions';
import { OrNothing } from '../../utils/types/types';

export interface ToastState {
    toasts: OrNothing<ToastActionType>;
}

const initialState: ToastState = {
    toasts: null
};

export const toastReducer = (state: ToastState = initialState, action: ToastAction): ToastState => {
    switch (action.type) {
        case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.VIS_LAGRE_NYTT_FILTER_TOAST:
        case ToastActionType.VIS_SLETTE_GRUPPE_TOAST:
            return ({toasts: action.type});
        case ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.FJERN_SLETTE_GRUPPE_TOAST:
            return ({toasts: null});
        default :
            return state;
    }
};

export default toastReducer;
