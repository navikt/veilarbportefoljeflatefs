export enum ToastActionType {
    VIS_LAGRE_ENDRINGER_TOAST = 'veiledergrupper_endre/OK',
    FJERN_LAGRE_ENDRINGER_TOAST = 'FJERN_LAGRE_ENDRINGER_TOAST',
    VIS_SLETTE_GRUPPE_TOAST = 'veiledergrupper_slette/OK',
    FJERN_SLETTE_GRUPPE_TOAST = 'FJERN_SLETTE_GRUPPE_TOAST',
    VIS_OPPRETT_GRUPPE_TOAST = 'veiledergrupper_ny/OK',
    FJERN_OPPRETT_GRUPPE_TOAST = 'FJERN_OPPRETT_GRUPPE_TOAST'
}

export interface ToastAction {
    type: ToastActionType;
}

export const toastAction = (type: ToastActionType): ToastAction => ({
    type
});

export const fjernLagreEndringerToast = (): ToastAction =>
    toastAction(ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST);

export const fjernSletteGruppeToast = (): ToastAction =>
    toastAction(ToastActionType.FJERN_SLETTE_GRUPPE_TOAST);

export const fjernOpprettGruppeToast = (): ToastAction =>
    toastAction(ToastActionType.FJERN_OPPRETT_GRUPPE_TOAST);
