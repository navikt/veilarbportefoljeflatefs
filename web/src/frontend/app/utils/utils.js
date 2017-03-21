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

export function leggEnhetIUrl(enhet) { // eslint-disable-line consistent-return
    if (!enhet) return null;
    const parsed = queryString.parse(location.search);
    parsed.enhet = enhet;

    const stringified = queryString.stringify(parsed);
    const pathname = window.location.pathname;
    window.history.replaceState({}, null, `${pathname}?${stringified}`);
}

export function erMellom(variabel, fra, til) {
    return variabel >= fra && variabel <= til;
}

export function filterUrlBuilder(filtervalg) {
    let result = '';

    if (filtervalg.nyeBrukere) {
        result += `&nyeBrukere=${filtervalg.nyeBrukere}`;
    }

    if (filtervalg.inaktiveBrukere) {
        result += `&inaktiveBrukere=${filtervalg.inaktiveBrukere}`;
    }

    if (filtervalg.alder && filtervalg.alder.length > 0) {
        filtervalg.alder.filter(i => erMellom(i, 0, 7)).forEach((i) => {
            result += `&alder[]=${i}`;
        });
    }

    if (filtervalg.kjonn && filtervalg.kjonn.length === 1) {
        result += `&kjonn=${filtervalg.kjonn[0]}`;
    }

    if (filtervalg.fodselsdagIMnd && filtervalg.fodselsdagIMnd.length > 0) {
        filtervalg.fodselsdagIMnd.filter(i => erMellom(i, 0, 30)).forEach((i) => {
            result += `&fodselsdagIMnd[]=${i}`;
        });
    }
    return result;
}

export function arraysHaveEqualContent(arr1, arr2) {
    if (arr1.length === 0 && arr2.length === 0) {
        return true;
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedCopy1 = arr1.slice().sort();
    const sortedCopy2 = arr2.slice().sort();

    for (let i = 0; i < sortedCopy1.length; i += 1) {
        if (sortedCopy1[i] !== sortedCopy2[i]) {
            return false;
        }
    }

    return true;
}
