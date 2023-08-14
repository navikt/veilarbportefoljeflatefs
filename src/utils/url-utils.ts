import * as queryString from 'query-string';
import {basename} from '../history';
import {DEFAULT_PAGINERING_STORRELSE, IKKE_SATT} from '../konstanter';

export function getFraBrukerFraUrl(): string {
    return queryString.parse(window.location.search).fraBruker as string;
}

export function setFraBrukerIUrl(bruker: string) {
    const parsed = queryString.parse(window.location.search);
    parsed.fraBruker = bruker;

    const lastSearch = localStorage.getItem('lastsearch');
    const fnrRegex = new RegExp('[0-9]{11}');

    if (lastSearch && fnrRegex.test(lastSearch)) {
        localStorage.setItem('lastsearch', lastSearch.replace(fnrRegex, bruker));
    } else if (lastSearch && !fnrRegex.test(lastSearch)) {
        localStorage.setItem('lastsearch', lastSearch.concat(`&fraBruker=${bruker}`));
    }
    localStorage.setItem('xPos', window.pageXOffset.toString());
    localStorage.setItem('yPos', window.pageYOffset.toString());
}

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

export function getPersonUrl(fnr: string | null, pathParam: string, enhet: string): string {
    const enhetParam = enhet ? '?enhet=' + enhet : '';
    const params = pathParam + enhetParam;
    return `/veilarbpersonflatefs${fnr ? `/${fnr}` : ''}${params}`;
}

export function updateLastPath() {
    const base = window.location.pathname.replace(basename, '');
    if (base !== '/tilbake') {
        const search = window.location.search;
        localStorage.setItem('lastpath', base);
        localStorage.setItem('lastsearch', search);
    }
}

export const erDev = () => process.env.REACT_APP_DEPLOYMENT_ENV === 'development';

export const erMock = () => process.env.REACT_APP_MOCK === 'true';

export const getEndringsloggUrl = () => `https://poao-endringslogg.intern${erDev() ? '.dev' : ''}.nav.no`;

export const loginUrl = () => {
    if (erMock()) {
        return '/';
    }
    return `${window.location.origin}/oauth2/login?redirect=${window.location.href}`;
};

export type DeploymentEnvironment = 'local' | 'development' | 'production';
