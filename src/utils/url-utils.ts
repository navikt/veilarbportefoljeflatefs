import queryString from 'query-string';
import {basename} from '../history';
import {DEFAULT_PAGINERING_STORRELSE, IKKE_SATT} from '../konstanter';

export function getSideFromUrl() {
    return parseInt((queryString.parse(window.location.search).side as string) || '1', 10);
}

export function getInitialStateFromUrl() {
    const side = getSideFromUrl();
    const sidestorrelse = getSidestorrelseFromUrl();
    const sorteringsfelt = getSorteringsFeltFromUrl();
    const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();

    return {side, sidestorrelse, sorteringsfelt, sorteringsrekkefolge};
}

export function getSidestorrelseFromUrl(): number {
    const sidestorrelseQuery = queryString.parse(window.location.search).sidestorrelse;
    if (typeof sidestorrelseQuery === 'string' && parseInt(sidestorrelseQuery) > 0) {
        return parseInt(sidestorrelseQuery);
    } else {
        return DEFAULT_PAGINERING_STORRELSE;
    }
}

export function getSorteringsFeltFromUrl() {
    return queryString.parse(window.location.search).sorteringsfelt || IKKE_SATT;
}

export function getSorteringsRekkefolgeFromUrl() {
    return queryString.parse(window.location.search).sorteringsrekkefolge || IKKE_SATT;
}

export function getVeilarbpersonflateBasePath() {
    if (getEnv() === Env.ansattDev) {
        return 'https://veilarbpersonflate.ansatt.dev.nav.no';
    }
    return erDev() || erDemo()
        ? 'https://veilarbpersonflate.intern.dev.nav.no'
        : 'https://veilarbpersonflate.intern.nav.no';
}

export function getVeilarbpersonflateUrl(pathParam: string | null, enhet: string): string {
    const basePath = getVeilarbpersonflateBasePath();

    const maybePathParam = pathParam || '';
    const enhetParam = `?enhet=${enhet}`;

    return `${basePath}${maybePathParam}${enhetParam}`;
}

export function updateLastPath() {
    const base = window.location.pathname.replace(basename, '');
    if (base !== '/tilbake') {
        const search = window.location.search;
        localStorage.setItem('lastpath', base);
        localStorage.setItem('lastsearch', search);
    }
}

export const erDev = () => getEnv() === Env.dev;
export const erProd = () => getEnv() === Env.prod;
export const erDemo = () => import.meta.env.MODE === 'demo';

export const getEnv = (): EnvConfig => {
    const {hostname} = window.location;
    if (hostname.includes('intern.dev.nav.no')) return Env.dev;
    if (hostname.includes('ansatt.dev.nav.no')) return Env.ansattDev;
    if (hostname.includes('intern.nav.no')) return Env.prod;
    return Env.local;
};

interface EnvConfig {
    ingressType: 'ansatt' | 'intern';
    type: EnvType;
}

export enum EnvType {
    prod = 'prod',
    dev = 'dev',
    local = 'local'
}

export const Env = {
    ansattDev: {ingressType: 'ansatt', type: EnvType.dev},
    dev: {ingressType: 'intern', type: EnvType.dev},
    prod: {ingressType: 'intern', type: EnvType.prod},
    local: {ingressType: 'intern', type: EnvType.local}
} as const;
export const getEndringsloggUrl = () => {
    const env = getEnv();
    if (env === Env.ansattDev) {
        return 'https://poao-endringslogg.ansatt.dev.nav.no';
    }
    return `https://poao-endringslogg.intern${erDev() ? '.dev' : ''}.nav.no`;
};

export const loginUrl = () => {
    if (erDemo()) {
        return '/';
    }
    return `${window.location.origin}/oauth2/login?redirect=${window.location.href}`;
};

export type DeploymentEnvironment = 'local' | 'development' | 'production';
