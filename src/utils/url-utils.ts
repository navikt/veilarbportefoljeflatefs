import * as queryString from 'query-string';
import history, { basename } from '../history';
import { IKKE_SATT } from '../konstanter';
import {OrNothing} from "./types/types";

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

export function leggEnhetIUrl(enhet: OrNothing<string>, refresh: boolean = false) {
    if (enhet) {
        const parsed = queryString.parse(window.location.search);
        parsed.enhet = enhet;
        const stringified = queryString.stringify(parsed);
        window.location.pathname.replace(basename, '');

        history.replace(`${window.location.pathname}?${stringified}`);
        if (refresh) {
            window.location.reload(true);
        }
    }

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

export function leggSideIUrl(side) {
    if (side) {
        const parsed = queryString.parse(window.location.search);
        parsed.side = side;

        const stringified = queryString.stringify(parsed);
        window.location.pathname.replace(basename, '');
        history.replace(`${window.location.pathname}?${stringified}`);
    }
}

export function getSideFromUrl() {
    return parseInt(queryString.parse(window.location.search).side || '1', 10);
}

export function leggSeAlleIUrl(seAlle: boolean = false) {
    const parsed = queryString.parse(window.location.search);
    parsed.seAlle = seAlle;
    const stringified = queryString.stringify(parsed);
    window.location.pathname.replace(basename, '');
    history.replace(`${window.location.pathname}?${stringified}`);
}

export function getSeAlleFromUrl(): boolean {
    return queryString.parse(window.location.search).seAlle === 'true';
}

export function leggSorteringIUrl(sorteringsfelt, sorteringsrekkefolge) {
    if (sorteringsfelt) {
        const parsed = queryString.parse(window.location.search);
        parsed.sorteringsfelt = sorteringsfelt;
        parsed.sorteringsrekkefolge = sorteringsrekkefolge ? sorteringsrekkefolge : '';

        const stringified = queryString.stringify(parsed);
        window.location.pathname.replace(basename, '');
        history.replace(`${window.location.pathname}?${stringified}`);
        localStorage.setItem(`lagretSorteringsfelt`, sorteringsfelt);
        localStorage.setItem(`lagretSorteringsrekkefolge`, sorteringsrekkefolge);
    }
}

export function getSorteringsFeltFromUrl() {
    return queryString.parse(window.location.search).sorteringsfelt || IKKE_SATT;
}

export function getSorteringsRekkefolgeFromUrl() {
    return queryString.parse(window.location.search).sorteringsrekkefolge || IKKE_SATT;
}

export function sendBrukerTilUrl(url) {
    history.replace(url);
}

export function miljoFraUrl() {
    return utledMiljoFraHost(window.location.host);
}

export function utledMiljoFraHost(host) {
    const matches = host.match(/-[a-zA-Z][0-9]+/);
    return matches == null ? '' : matches[0];
}

export function updateLastPath() {
    const base = window.location.pathname.replace(basename, '');
    if (base !== '/tilbake') {
        const search = window.location.search;
        localStorage.setItem('lastpath', base);
        localStorage.setItem('lastsearch', search);
    }
}
