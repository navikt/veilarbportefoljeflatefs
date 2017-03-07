import { fetchToJson, sjekkStatuskode } from '../ducks/utils';
import { erDev } from './../utils/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = {
    credentials: 'same-origin',
    headers: {
        authorization: `Bearer ${sessionStorage.oidc}`,
        'Content-Type': 'application/json'
    }
};

const VEILARBVEILEDER_URL = erDev() ? ':9590/veilarbveileder' : '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = erDev() ? ':9594/veilarbportefolje' : '/veilarbportefolje';
const VEILARBSITUASJON_URL = erDev() ? ':8485/veilarbsituasjon' : '/veilarbsituasjon';

function hentNyttJwtPromise() {
    if (jwtExpirationImminent()) {
        return new Promise((resolve) => {
            console.log('Token går snart ut. Starter innlogging'); // eslint-disable-line no-console
            GLOBAL_JWT_UPDATE_RESOLVE = resolve;
            startLoginSequence();
        });
    }
    return Promise.resolve();
}

export function hentVeiledersEnheter() {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/veileder/enheter`;
    return hentNyttJwtPromise().then(() => fetchToJson(url, MED_CREDENTIALS));
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentEnhetsPortefolje(enhet, rekkefolge, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhet}/` +
                `portefolje?fra=${fra}&antall=${antall}&sortByLastName=${rekkefolge}`;
    return hentNyttJwtPromise().then(() => fetchToJson(url, MED_CREDENTIALS));
}

export function hentEnhetsPortefoljeMedFiltrering(enhet, rekkefolge, fra, antall, nyeBrukere, inaktiveBrukere) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhet}/` +
        `portefolje?fra=${fra}&antall=${antall}&sortByLastName=${rekkefolge}` +
        `&nyeBrukere=${nyeBrukere}&inaktiveBrukere=${inaktiveBrukere}`;
    return hentNyttJwtPromise().then(() => fetchToJson(url, MED_CREDENTIALS));
}

export function hentVeiledersPortefolje(enhet, veilederident, rekkefolge, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/veileder/` +
        `${veilederident}/portefolje?enhet=${enhet}&fra=${fra}&antall=${antall}&sortByLastName=${rekkefolge}`;
    return hentNyttJwtPromise().then(() => fetchToJson(url, MED_CREDENTIALS));
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/enhet/${enhetId}/veiledere`;
    return hentNyttJwtPromise().then(() => fetchToJson(url, MED_CREDENTIALS));
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhetId}` +
        '/portefoljestorrelser';
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `https://${window.location.hostname}${VEILARBSITUASJON_URL}/api/tilordneveileder/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(tilordninger) };
    return hentNyttJwtPromise().then(() => fetch(url, config).then(sjekkStatuskode));
}
