/* eslint-disable import/prefer-default-export*/
export function erDev() {
    const url = window.location.href;
    return url.includes('debug=true') || url.includes('devillo.no:9594') || url.includes('localhost:8586');
}
