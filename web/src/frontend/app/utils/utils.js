/* eslint-disable import/prefer-default-export*/
import queryString from 'query-string';

export function erDev() {
    const url = window.location.href;
    return url.includes('debug=true') || url.includes('devillo.no:9592')
        || url.includes('devillo.no:9593') || url.includes('localhost:');
}

export function leggEnhetIUrl(enhet) { // eslint-disable-line consistent-return
    if (!enhet) return null;
    const parsed = queryString.parse(location.search);
    parsed.enhet = enhet;

    const stringified = queryString.stringify(parsed);
    const pathname = window.location.pathname;
    window.history.replaceState({}, null, `${pathname}?${stringified}`);
}

export function filterUrlBuilder(nyeBrukere, inaktiveBrukere) {
    let result = '';

    if (nyeBrukere) {
        result += `&nyeBrukere=${nyeBrukere}`;
    }

    if (inaktiveBrukere) {
        result += `&inaktiveBrukere=${inaktiveBrukere}`;
    }
    return result;
}
