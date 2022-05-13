import {AktiviteterModell} from '../model-interfaces';
import {Maybe} from './types';

export function range(start: number, end: number, inclusive: boolean = false): number[] {
    return new Array(end - start + (inclusive ? 1 : 0)).fill(0).map((_, i) => start + i);
}

export function lag2Sifret(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

export function nesteUtlopsdatoEllerNull(utlopsdatoer: Maybe<AktiviteterModell>): Maybe<Date> {
    if (!utlopsdatoer) {
        return null;
    }

    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);
    return Object.keys(utlopsdatoer)
        .map(key => utlopsdatoer[key])
        .filter(value => !!value)
        .map(dateString => new Date(dateString))
        .filter(date => date.getTime() >= dagensDato.getTime())
        .sort((d1, d2) => d1.getTime() - d2.getTime())[0];
}

export function parseDatoString(datoString: Maybe<string>): Maybe<Date> {
    if (!datoString) return null;

    return new Date(datoString);
}

export function utledValgteAktivitetsTyper(
    brukerAktiviteter,
    avanserteAktiviteterFiltervalg
): Maybe<AktiviteterModell> {
    if (
        !avanserteAktiviteterFiltervalg ||
        Object.keys(avanserteAktiviteterFiltervalg).length === 0 ||
        !brukerAktiviteter ||
        Object.keys(avanserteAktiviteterFiltervalg).length === 0
    ) {
        return null;
    }
    return Object.entries(avanserteAktiviteterFiltervalg)
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

export function erGithubPages() {
    return window.location.host.includes('navikt.github.io');
}

export function utlopsdatoUker(utlopsdatoStr?: string): number | undefined {
    if (!utlopsdatoStr) {
        return undefined;
    }

    const utlopsdato = new Date(utlopsdatoStr);
    if (Number.isNaN(utlopsdato.getTime())) {
        return undefined;
    }
    const now = new Date();
    const millisDiff = utlopsdato.getTime() - now.getTime();

    return Math.round(millisDiff / (7 * 24 * 3600 * 1000));
}

export function aapRettighetsperiode(ytelse, maxtidukerigjen, unntakukerigjen) {
    if (ytelse === 'AAP') {
        return maxtidukerigjen !== -1 ? maxtidukerigjen : unntakukerigjen;
    } else if (ytelse === 'AAP_MAXTID') {
        return maxtidukerigjen;
    } else if (ytelse === 'AAP_UNNTAK') {
        return unntakukerigjen;
    }
}

export default function TittelValg(ytelseSorteringHeader) {
    if (ytelseSorteringHeader === 'Gjenstående uker vedtak') {
        return 'Gjenstående uker på gjeldende vedtak';
    } else if (ytelseSorteringHeader === 'Gjenstående uker rettighet') {
        return 'Gjenstående uker av rettighetsperioden for ytelsen';
    }
    return '';
}

export const keyCodes = {
    tab: 9,
    enter: 13,
    shift: 16,
    alt: 18,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    esc: 27
};

export function specialChar(string: string | {label: string}) {
    return string
        .toString()
        .toLowerCase()
        .split('æ')
        .join('ae')
        .split('ø')
        .join('o')
        .split('å')
        .join('a');
}

export function kebabCase(string: string | {label: string}) {
    return specialChar(string).replace(/\s+/g, '-');
}

export function kebabUtenSpesialtegn(string: string | {label: string}) {
    string.toString();
    const regExpr = /[^a-zA-Z0-9-. ]/g;
    return kebabCase(string).replace(regExpr, '');
}

export function nameCapitalization(str: string) {
    return str
        .toLowerCase()
        .replace(/(^|[^a-z\u00C0-\u017F\u0400-\u04FF'])([a-z\u00C0-\u017F\u0400-\u04FF])/g, s => s.toUpperCase());
}
