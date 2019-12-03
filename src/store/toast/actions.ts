export enum ToastActionType {
    VIS_LAGRE_ENDRINGER_TOAST = 'veiledergrupper_endre/OK',
    FJERN_LAGRE_ENDRINGER_TOAST = 'FJERN_LAGRE_ENDRINGER_TOAST'
}

export interface ToastAction {
    type: ToastActionType;
}

export const toastAction = (type: ToastActionType): ToastAction => ({
    type
});

export const visLagreEndringerToast = (): ToastAction =>
    toastAction(ToastActionType.VIS_LAGRE_ENDRINGER_TOAST);

export const fjernLagreEndringerToast = (): ToastAction =>
    toastAction(ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST);
