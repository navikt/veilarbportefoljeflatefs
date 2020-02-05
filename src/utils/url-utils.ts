import * as queryString from 'query-string';
import history, { basename } from '../history';
import { IKKE_SATT } from '../konstanter';

export function slettCleanIUrl() {
    const parsed = queryString.parse(window.location.search); // eslint-disable-line no-undef

    // Objektet returnert fra `queryString.parse` er ikke et ekte objekt. Så derfor denne omstendlige sjekken
    if (!Object.keys(parsed).includes('clean')) {
        return;
    }

    delete parsed.clean;

    const stringified = queryString.stringify(parsed);
    window.location.pathname.replace(basename, '');
    history.replace(`${window.location.pathname}?${stringified}`);
}


export function getFraBrukerFraUrl() {
    return queryString.parse(window.location.search).fraBruker;
}

export function setFraBrukerIUrl(bruker: string) {
    const parsed = queryString.parse(window.location.search);
    parsed.fraBruker = bruker;

    const lastSearch = localStorage.getItem('lastsearch');
    const fnrRegex = new RegExp('[0-9]{11}');

    if(lastSearch && fnrRegex.test(lastSearch)) {
        localStorage.setItem('lastsearch', lastSearch.replace(fnrRegex, bruker));
    } else if(lastSearch && !fnrRegex.test(lastSearch)) {
        localStorage.setItem('lastsearch', lastSearch.concat(`&fraBruker=${bruker}`));
    }

    const stringified = queryString.stringify(parsed);
    history.replace(`${ window.location.pathname}?${stringified}`);
}

export function getEnhetFromUrl() {
    return queryString.parse(window.location.search).enhet || '';
}

export function getSideFromUrl() {
    return parseInt(queryString.parse(window.location.search).side || '1', 10);
}

export function getInitialStateFromUrl () {
    const side = getSideFromUrl();
    const seAlle = getSeAlleFromUrl();
    const sorteringsfelt = getSorteringsFeltFromUrl();
    const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();

    return {side, seAlle, sorteringsfelt, sorteringsrekkefolge};
}

export function getSeAlleFromUrl(): boolean {
    return queryString.parse(window.location.search).seAlle === 'true';
}

export function getSorteringsFeltFromUrl() {
    return queryString.parse(window.location.search).sorteringsfelt || IKKE_SATT;
}

export function getSorteringsRekkefolgeFromUrl() {
    return queryString.parse(window.location.search).sorteringsrekkefolge || IKKE_SATT;
}

export function updateLastPath() {
    const base = window.location.pathname.replace(basename, '');
    if (base !== '/tilbake') {
        const search = window.location.search;
        localStorage.setItem('lastpath', base);
        localStorage.setItem('lastsearch', search);
    }
}
