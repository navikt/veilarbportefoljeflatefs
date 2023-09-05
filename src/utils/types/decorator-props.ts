export interface TogglesConfig {
    visVeileder?: boolean;
}

export interface Contextholder {
    promptBeforeEnhetChange?: boolean;
}

export interface Markup {
    etterSokefelt?: string;
}

export interface BaseContextvalue<T> {
    display: T;

    onChange(value: string | null): void;

    skipModal?: boolean;
    ignoreWsEvents?: boolean;
}

export type ProxyConfig = boolean | string;

export interface ControlledContextvalue<T> extends BaseContextvalue<T> {
    value: string | null;
}

export interface UncontrolledContextvalue<T> extends BaseContextvalue<T> {
    initialValue: string | null;
}

export type Contextvalue<T> = ControlledContextvalue<T> | UncontrolledContextvalue<T>;

export enum EnhetDisplay {
    ENHET_VALG = 'ENHET_VALG'
}

export enum FnrDisplay {
    SOKEFELT = 'SOKEFELT'
}

export type EnhetContextvalue = Contextvalue<EnhetDisplay>;
export type FnrContextvalue = Contextvalue<FnrDisplay>;

export type KeyDescriptionObject = {
    char: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
};
export type KeyDescription = string | KeyDescriptionObject;

export interface BaseHotkey {
    key: KeyDescription;
    description: string;
}

export interface ActionHotkey extends BaseHotkey {
    action(event: KeyboardEvent): void;
}

export interface DocumentingHotkey extends BaseHotkey {
    documentationOnly: boolean;
}

export type Hotkey = ActionHotkey | DocumentingHotkey;

export interface DecoratorProps {
    appname: string;
    fnr?: FnrContextvalue;
    enhet?: EnhetContextvalue;
    toggles?: TogglesConfig;
    markup?: Markup;
    hotkeys?: Hotkey[];
    useProxy?: ProxyConfig;
    accessToken?: string;
}
