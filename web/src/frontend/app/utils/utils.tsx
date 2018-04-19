import { AktiviteterModell } from '../model-interfaces';
import * as React from 'react';

export function range(start: number, end: number, inclusive: boolean = false): number[] {
    return new Array((end - start) + ((inclusive) ? 1 : 0)).fill(0).map((_, i) => start + i);
}

export function lag2Sifret(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

export function ytelseFilterErAktiv(ytelse) {
    return !!ytelse;
}

export function nesteUtlopsdatoEllerNull(utlopsdatoer: AktiviteterModell | null): Date | null {
    if (!utlopsdatoer) {
        return null;
    }

    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);
    return Object.keys(utlopsdatoer)
        .map((key) => utlopsdatoer[key])
        .filter((value) => !!value)
        .map((dateString) => new Date(dateString))
        .filter((date) => date.getTime() >= dagensDato.getTime())
        .sort((d1, d2) => d1.getTime() - d2.getTime())[0];
}

export function utledValgteAktivitetsTyper(brukerAktiviteter, aktiviteterFiltervalg): AktiviteterModell | null {
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
