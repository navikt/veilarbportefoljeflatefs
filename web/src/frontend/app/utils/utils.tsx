/* eslint-disable import/prefer-default-export, no-undef */
import * as queryString from 'query-string';
import history, { basename } from '../history';

export function range(start: number, end: number, inclusive: boolean = false): number[] {
    return new Array((end - start) + ((inclusive) ? 1 : 0)).fill(0).map((_, i) => start + i);
}

export function lag2Sifret(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

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

export function leggEnhetIUrl(enhet: string) {
    if (enhet) {
        const parsed = queryString.parse(location.search);
        parsed.enhet = enhet;

        const stringified = queryString.stringify(parsed);
        const pathname = window.location.pathname.replace(basename, '');
        history.replace(`${pathname}?${stringified}`);
    }
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

export function sendBrukerTilUrl(url) {
    history.replace(url);
}
export function ytelseFilterErAktiv(ytelse) {
    return !!ytelse;
}
export function nesteUtlopsdatoEllerNull(utlopsdatoer): Date | null {
    if (!utlopsdatoer) {
        return null;
    }
    return Object.keys(utlopsdatoer)
        .map((key) => utlopsdatoer[key])
        .filter((value) => !!value)
        .map((dateString) => new Date(dateString))
        .filter((date) => date.getTime() >= Date.now())
        .sort((d1, d2) => d1.getTime() - d2.getTime())[0];
}
export function utledValgteAktivitetsTyper(brukerAktiviteter, aktiviteterFiltervalg) {
    if (!aktiviteterFiltervalg || Object.keys(aktiviteterFiltervalg).length === 0 || !brukerAktiviteter || Object.keys(aktiviteterFiltervalg).length === 0) {
        return null;
    }
    return Object.entries(aktiviteterFiltervalg)
        .filter(([_, value]) => value === 'JA')
        .map(([key, _]) => key.toLowerCase())
        .reduce((obj, key) => {
            obj[key] = brukerAktiviteter[key];
            return obj;
        }, {});
}

export function erDev() {
    const host: string = window.location.host;
    return host.includes('localhost') || host.includes('127.0.0.1');
}
