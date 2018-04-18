import * as queryString from 'query-string';
import history, { basename } from '../history';
import { IKKE_SATT } from '../konstanter';

export function slettCleanIUrl() {
    const parsed = queryString.parse(location.search); // eslint-disable-line no-undef

    // Objektet returnert fra `queryString.parse` er ikke et ekte objekt. Så derfor denne omstendlige sjekken
    if (!Object.keys(parsed).includes('clean')) {
        return;
    }

    delete parsed.clean;

    const stringified = queryString.stringify(parsed);
    const pathname = window.location.pathname.replace(basename, '');
    history.replace(`${pathname}?${stringified}`);
}

export function leggEnhetIUrl(enhet: string, refresh: boolean = false) {
    if (enhet) {
        const parsed = queryString.parse(location.search);
        parsed.enhet = enhet;

        const stringified = queryString.stringify(parsed);
        const pathname = window.location.pathname.replace(basename, '');
        history.replace(`${pathname}?${stringified}`);
        if (refresh) {
            window.location.reload(true);
        }
    }
}

export function getFraBrukerFraUrl() {
    return queryString.parse(location.search).fraBruker;
}

export function fjernFraBrukerFraUrl() {
    const parsed = queryString.parse(location.search);
    delete parsed.fraBruker;

    const stringified = queryString.stringify(parsed);
    const pathname = window.location.pathname.replace(basename, '');
    history.replace(`${pathname}?${stringified}`);

}

export function getEnhetFromUrl() {
    return queryString.parse(location.search).enhet || '';
}

export function leggSideIUrl(path, side) {
    if (side) {
        const parsed = queryString.parse(location.search);
        parsed.side = side;

        const stringified = queryString.stringify(parsed);
        const pathname = window.location.pathname.replace(basename, '');
        history.replace(`${pathname}?${stringified}`);
        localStorage.setItem(`${path}-lagretSidetall`, side);
    }
}

export function getSideFromUrl() {
    return queryString.parse(location.search).side || '';
}

export function leggSorteringIUrl(sorteringsfelt, sorteringsrekkefolge) {
    if (sorteringsfelt) {
        const parsed = queryString.parse(location.search);
        parsed.sorteringsfelt = sorteringsfelt;
        parsed.sorteringsrekkefolge = sorteringsrekkefolge ? sorteringsrekkefolge : '';

        const stringified = queryString.stringify(parsed);
        const pathname = window.location.pathname.replace(basename, '');
        history.replace(`${pathname}?${stringified}`);
        localStorage.setItem(`lagretSorteringsfelt`, sorteringsfelt);
        localStorage.setItem(`lagretSorteringsrekkefolge`, sorteringsrekkefolge);
    }
}

export function getSorteringsFeltFromUrl() {
    return queryString.parse(location.search).sorteringsfelt || IKKE_SATT;
}

export function getSorteringsRekkefolgeFromUrl() {
    return queryString.parse(location.search).sorteringsrekkefolge || IKKE_SATT;
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
