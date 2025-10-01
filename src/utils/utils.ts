import {RefObject} from 'react';
import {AktiviteterModell, BrukerModell, Innsatsgruppe} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Maybe} from './types';
import {dateGreater, toDateString} from './dato-utils';
import {settBrukerIKontekst} from '../middleware/api';
import {AktiviteterValg} from '../filtrering/filter-konstanter';

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
        .filter(([_, value]) => value === AktiviteterValg.JA)
        .map(([key, _]) => key.toLowerCase())
        .reduce((obj, key) => {
            obj[key] = brukerAktiviteter[key];
            return obj;
        }, {});
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

export function ytelsestypetekst(brukerytelse: string) {
    if (brukerytelse === 'AAP_MAXTID') {
        return 'Ordinær';
    } else if (brukerytelse === 'AAP_UNNTAK') {
        return 'Unntak';
    } else return '-';
}

export function aapVurderingsfrist(
    innsatsgruppe: Innsatsgruppe,
    brukerYtelse: string | undefined,
    utlopsdatoVedtak?: string,
    utlopsdatoOrdinerRettighet?: string
): string | undefined {
    const iDag = new Date();
    if (brukerYtelse === 'AAP_MAXTID') {
        // makstid == ordinær rettighetsperiode
        if (utlopsdatoOrdinerRettighet) {
            // Hvis utlopsdatoOrdinerRettighet eksisterer så er brukeren BATT (filtreres backend)
            const vurderingsfrist = new Date(utlopsdatoOrdinerRettighet);
            vurderingsfrist.setDate(vurderingsfrist.getDate() - 40); // 5 ukers frist er spesifisert av servicerutinen for AAP, på ordinær er den ikke nøyaktig på det vi får fra Arena, så setter den til 40 dager
            return dateGreater(vurderingsfrist, iDag)
                ? toDateString(vurderingsfrist)
                : `Utløpt: ${toDateString(vurderingsfrist)}`;
        } else if (innsatsgruppe === Innsatsgruppe.BATT) {
            // Hvis bruker er BATT, så har vi ikke fått melding fra Arena som oppretter en ordinerutlopsdato
            return 'Mangler data';
        } else {
            return 'Ikke spesielt tilpasset innsats';
        }
    } else if (brukerYtelse === 'AAP_UNNTAK') {
        if (!utlopsdatoVedtak) {
            return undefined;
        }
        const vurderingsfrist = new Date(utlopsdatoVedtak);
        vurderingsfrist.setDate(vurderingsfrist.getDate() - 35); // 35 dager/5 ukers frist er spesifisert av servicerutinen for AAP
        return dateGreater(vurderingsfrist, iDag)
            ? toDateString(vurderingsfrist)
            : `Utløpt: ${toDateString(vurderingsfrist)}`;
    }
}

export function aapRettighetsperiode(ytelse, maxtidukerigjen, unntakukerigjen) {
    if (ytelse === 'AAP') {
        return maxtidukerigjen !== 0 ? maxtidukerigjen : unntakukerigjen;
    } else if (ytelse === 'AAP_MAXTID') {
        return maxtidukerigjen;
    } else if (ytelse === 'AAP_UNNTAK') {
        return unntakukerigjen;
    }
}

export function tolkBehov(filtervalg: FiltervalgModell, bruker: BrukerModell) {
    const behov: string[] = [];
    if (
        (filtervalg.tolkebehov.includes('TALESPRAAKTOLK') &&
            bruker.tolkebehov.talespraaktolk !== undefined &&
            bruker.tolkebehov.talespraaktolk !== null &&
            bruker.tolkebehov.talespraaktolk.length > 0) ||
        (bruker.tolkebehov.talespraaktolk !== undefined &&
            filtervalg.tolkBehovSpraak.includes(bruker.tolkebehov.talespraaktolk))
    ) {
        behov.push('Talespråktolk');
    }

    if (
        (filtervalg.tolkebehov.includes('TEGNSPRAAKTOLK') &&
            bruker.tolkebehov.tegnspraaktolk !== undefined &&
            bruker.tolkebehov.tegnspraaktolk !== null &&
            bruker.tolkebehov.tegnspraaktolk.length > 0) ||
        (bruker.tolkebehov.tegnspraaktolk !== undefined &&
            filtervalg.tolkBehovSpraak.includes(bruker.tolkebehov.tegnspraaktolk))
    ) {
        if (behov.length > 0) {
            behov.push('tegnspråktolk');
        } else {
            behov.push('Tegnspråktolk');
        }
    }

    if (behov.length === 0) {
        return '-';
    }

    return behov.join(', ');
}

function leggTilSpraakInfo(filtervalg: FiltervalgModell) {
    return (
        (filtervalg.tolkebehov.includes('TALESPRAAKTOLK') && filtervalg.tolkebehov.includes('TEGNSPRAAKTOLK')) ||
        (filtervalg.tolkBehovSpraak.length > 0 && filtervalg.tolkebehov.length === 0)
    );
}

function formatSpraakTekst(inputText: string, leggTilSpraak: boolean, tolkvehov: string, lowerCase: boolean) {
    if (leggTilSpraak) {
        inputText += ' (' + tolkvehov + ')';
    }

    if (lowerCase) {
        inputText = inputText.toLowerCase();
    }
    return inputText;
}

export function tolkBehovSpraak(
    filtervalg: FiltervalgModell,
    bruker: BrukerModell,
    tolkbehovSpraakData: Map<string, string>
): string {
    const behovSpraak: string[] = [];
    let leggTilSpraak = leggTilSpraakInfo(filtervalg);

    if (
        (filtervalg.tolkebehov.includes('TALESPRAAKTOLK') &&
            bruker.tolkebehov.talespraaktolk !== undefined &&
            bruker.tolkebehov.talespraaktolk !== null &&
            bruker.tolkebehov.talespraaktolk.length > 0) ||
        (bruker.tolkebehov.talespraaktolk !== null &&
            bruker.tolkebehov.talespraaktolk !== undefined &&
            filtervalg.tolkBehovSpraak.includes(bruker.tolkebehov.talespraaktolk))
    ) {
        behovSpraak.push(
            formatSpraakTekst(tolkbehovSpraakData.get(bruker.tolkebehov.talespraaktolk)!, leggTilSpraak, 'tale', false)
        );
    }

    if (
        (filtervalg.tolkebehov.includes('TEGNSPRAAKTOLK') &&
            bruker.tolkebehov.tegnspraaktolk !== undefined &&
            bruker.tolkebehov.tegnspraaktolk !== null &&
            bruker.tolkebehov.tegnspraaktolk.length > 0) ||
        (bruker.tolkebehov.tegnspraaktolk !== null &&
            bruker.tolkebehov.tegnspraaktolk !== undefined &&
            filtervalg.tolkBehovSpraak.includes(bruker.tolkebehov.tegnspraaktolk))
    ) {
        let spraak = tolkbehovSpraakData.get(bruker.tolkebehov.tegnspraaktolk);
        let convertToLowerCase = behovSpraak.length > 0 && spraak !== undefined;

        behovSpraak.push(formatSpraakTekst(spraak!, leggTilSpraak, 'tegn', convertToLowerCase));
    }

    if (behovSpraak.length === 0) {
        return '-';
    }

    return behovSpraak.join(', ');
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
    return string.toString().toLowerCase().split('æ').join('ae').split('ø').join('o').split('å').join('a');
}

export function kebabCase(string: string | {label: string}) {
    return specialChar(string).replace(/\s+/g, '-');
}

export function kebabUtenSpesialtegn(s: string | {label: string}) {
    const regExpr = /[^a-zA-Z0-9-. ]/g;
    return kebabCase(typeof s === 'string' ? s : s.label).replace(regExpr, '');
}

export function capitalize(str: string) {
    return str
        .toLowerCase()
        .replace(/(^|[^a-z\u00C0-\u017F\u0400-\u04FF'])([a-z\u00C0-\u017F\u0400-\u04FF])/g, s => s.toUpperCase());
}

export function bostedKommuneUtlandEllerUkjent(bruker: BrukerModell, geografiskbostedData) {
    if (bruker.bostedKommune) {
        return geografiskbostedData.get(bruker.bostedKommune);
    }
    if (bruker.harUtelandsAddresse) {
        return 'Utland';
    }
    if (bruker.harUkjentBosted) {
        return 'Ukjent';
    }
    return '-';
}

export const bostedBydelEllerUkjent = (bostedBydel: string, geografiskbostedData: Map<string, string>): string => {
    return geografiskbostedData.get(bostedBydel) ?? '–';
};

export const oppdaterBrukerIKontekstOgNavigerTilLenke = (fnr: string, lenke: string, apneNyFane?: boolean) => {
    return settBrukerIKontekst(fnr).then(() => {
        if (apneNyFane) {
            window.open(lenke, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = lenke;
        }
    });
};

/**
 * Utfør en handling dersom det klikkes utenfor et/flere element(er).
 *
 * @param elementer Et eller flere elementer som man ønsker å sjekke om det klikkes utenfor
 * @param klikkTarget Elementet som trigget klikk-eventet
 * @param callback Funksjonen som skal utføres dersom det klikkes utenfor
 */
export const vedKlikkUtenfor = (
    elementer: RefObject<HTMLElement>[],
    klikkTarget: Node | null,
    callback: () => void
) => {
    if (!elementer.some(ref => ref.current?.contains(klikkTarget))) {
        callback();
    }
};

export const alfabetiskSammenligning = (a: string, b: string) => {
    return a.localeCompare(b);
};
