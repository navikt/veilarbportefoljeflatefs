/* eslint-disable import/prefer-default-export*/
import queryString from 'query-string';

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

export function leggEnhetIUrl(enhet) {
    if (enhet) {
        const parsed = queryString.parse(location.search);
        parsed.enhet = enhet;

        const stringified = queryString.stringify(parsed);
        const pathname = window.location.pathname;
        window.history.replaceState({}, null, `${pathname}?${stringified}`);
    }
}

export function ytelseFilterErAktiv(ytelse) {
    if (!ytelse) {
        return false;
    }
    const { ordinaereDagpenger, dagpengerUnderPermittering, aapMaxtid, aapUnntak } = ytelse;
    return ordinaereDagpenger || dagpengerUnderPermittering || aapMaxtid || aapUnntak;
}

export function ytelseDiagramSkalVises(ytelse) {
    if (!ytelse) {
        return false;
    }
    const { ordinaereDagpenger, dagpengerUnderPermittering, aapMaxtid } = ytelse;
    return ordinaereDagpenger || dagpengerUnderPermittering || aapMaxtid;
}

export function utledKategoriForDiagram(ytelse) {
    let kategori = '';
    if (!ytelse) {
        return kategori;
    }

    if (ytelse.aapMaxtid) {
        kategori = 'AAP Maxtid';
    } else if (ytelse.ordinaereDagpenger || ytelse.dagpengerUnderPermittering) {
        kategori = 'Dagpenger';
    } else if (ytelse.tiltakspenger) {
        kategori = 'Tiltakspenger';
    }

    return kategori;
}
