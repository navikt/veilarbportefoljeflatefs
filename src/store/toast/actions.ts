export enum ToastActionType {
    VIS_LAGRE_ENDRINGER_TOAST = 'veiledergrupper_endre/OK',
    FJERN_LAGRE_ENDRINGER_TOAST = 'FJERN_LAGRE_ENDRINGER_TOAST',
    VIS_SLETTE_GRUPPE_TOAST = 'veiledergrupper_slette/OK',
    FJERN_SLETTE_GRUPPE_TOAST = 'FJERN_SLETTE_GRUPPE_TOAST',
    VIS_OPPRETT_GRUPPE_TOAST = 'veiledergrupper_ny/OK',
    FJERN_OPPRETT_GRUPPE_TOAST = 'FJERN_OPPRETT_GRUPPE_TOAST',
    VIS_INGEN_ENDRINGER_TOAST = 'VIS_INGEN_ENDRINGER_TOAST',
    FJERN_INGEN_ENDRINGER_TOAST = 'FJERN_INGEN_ENDRINGER_TOAST',
    VIS_LAGRE_SORTERING_TOAST = 'lagredefilter_sortering/OK',
    VIS_SORTERING_FEILET_TOAST = 'lagredefilter_sortering/FEILET',
    FJERN_SORTERING_TOAST = 'FJERN_SORTERING_TOAST'
}

export interface ToastAction {
    type: ToastActionType;
}

export const toastAction = (type: ToastActionType): ToastAction => ({
    type
});

export const fjernLagreEndringerToast = (): ToastAction => toastAction(ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST);

export const fjernSletteGruppeToast = (): ToastAction => toastAction(ToastActionType.FJERN_SLETTE_GRUPPE_TOAST);

export const fjernOpprettGruppeToast = (): ToastAction => toastAction(ToastActionType.FJERN_OPPRETT_GRUPPE_TOAST);

export const visIngenEndringerToast = (): ToastAction => toastAction(ToastActionType.VIS_INGEN_ENDRINGER_TOAST);

export const fjernIngenEndringerToast = (): ToastAction => toastAction(ToastActionType.FJERN_INGEN_ENDRINGER_TOAST);

export const fjernSorteringToast = (): ToastAction => toastAction(ToastActionType.FJERN_SORTERING_TOAST);
