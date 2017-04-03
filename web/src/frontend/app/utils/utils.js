/* eslint-disable import/prefer-default-export, no-undef*/
import queryString from 'query-string';
import history from '../history';

export function erDev() {
    const url = window.location.href;
    return url.includes('debug=true') || url.includes('devillo.no:9592')
        || url.includes('devillo.no:9593') || url.includes('localhost:');
}

export function range(start, end, inclusive = false) {
    return new Array((end - start) + ((inclusive) ? 1 : 0)).fill(0).map((_, i) => start + i);
}

export function lag2Sifret(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

export function slettCleanIUrl() {
    const parsed = queryString.parse(location.search);// eslint-disable-line no-undef

    // Objektet returnert fra `queryString.parse` er ikke et ekte objekt. Så derfor denne omstendlige sjekken
    if (!Object.keys(parsed).includes('clean')) {
        return;
    }

    delete parsed.clean;

    const stringified = queryString.stringify(parsed);
    const pathname = window.location.pathname;
    window.history.replaceState({}, null, `${pathname}?${stringified}`);
}

export function leggEnhetIUrl(enhet) {
    if (enhet) {
        const parsed = queryString.parse(location.search);
        parsed.enhet = enhet;

        const stringified = queryString.stringify(parsed);
        const pathname = window.location.pathname;
        window.history.replaceState({}, null, `${pathname}?${stringified}`);// eslint-disable-line no-undef
    }
}

export function getEnhetFromUrl() {
    return queryString.parse(location.search).enhet || '';
}

export function sendBrukerTilUrl(url) {
    history.replace(url);
}

export function ytelseFilterErAktiv(ytelse) {
    return !!ytelse;
}
