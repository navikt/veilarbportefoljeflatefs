export interface TogglesConfig {
    visVeileder?: boolean;
}

export interface Contextholder {
    promptBeforeEnhetChange?: boolean;
}

export interface Markup {
    etterSokefelt?: string;
}

export interface Contextvalue<T> {
    initialValue: string | null;
    display: T;
    onChange(value: string | null): void;
    ignoreWsEvents?: boolean;
}

export enum EnhetDisplay {
    ENHET_VALG = 'ENHET_VALG'
}

export enum FnrDisplay {
    SOKEFELT = 'SOKEFELT'
}

export type EnhetContextvalue = Contextvalue<EnhetDisplay>;
export type FnrContextvalue = Contextvalue<FnrDisplay>;

export interface DecoratorProps {
    appname: string;
    fnr?: FnrContextvalue;
    enhet?: EnhetContextvalue;
    toggles?: TogglesConfig;
    markup?: Markup;
    contextholderConfig?: Contextholder;
}