import { ToastAction, ToastActionType } from './actions';

export interface ToastState {
    toasts: ToastActionType[];
}

const initialState: ToastState = {
    toasts: []
};

export const toastReducer = (state: ToastState = initialState, action: ToastAction): ToastState => {
    switch (action.type) {
        case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.VIS_LAGRE_NYTT_FILTER_TOAST:
            return {
                toasts: [...state.toasts, action.type]
            };
        case ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST:
            return {
                toasts: state.toasts.filter(toast => toast !== ToastActionType.VIS_LAGRE_ENDRINGER_TOAST)
            };
        case ToastActionType.VIS_SLETTE_GRUPPE_TOAST:
            return {
                toasts: [...state.toasts, action.type]
            };
        case ToastActionType.FJERN_SLETTE_GRUPPE_TOAST:
            return {
                toasts: state.toasts.filter(toast => toast !== ToastActionType.VIS_SLETTE_GRUPPE_TOAST)
            };
        default :
            return state;
    }
};

export default toastReducer;
