/* eslint-disable no-undef*/
import { fetchToJson, sjekkStatuskode } from '../ducks/utils';
import { erDev } from './../utils/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const credentials = erDev() ? 'include' : 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

const VEILARBVEILEDER_URL = erDev() ? ':9590/veilarbveileder' : '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = erDev() ? ':9594/veilarbportefolje' : '/veilarbportefolje';
const VEILARBSITUASJON_URL = erDev() ? ':8485/veilarbsituasjon' : '/veilarbsituasjon';

export function hentVeiledersEnheter() {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/veileder/enheter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, fra, antall, filtervalg) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhet}/` +
        `portefolje?fra=${fra}&antall=${antall}&sortDirection=${rekkefolge}&sortField=${sorteringsfelt}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentVeiledersPortefolje(enhet, veilederident, rekkefolge, sorteringsfelt, fra, antall, filtervalg) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/veileder/` +
        `${veilederident}/portefolje?enhet=${enhet}&fra=${fra}&antall=${antall}` +
        `&sortDirection=${rekkefolge}&sortField=${sorteringsfelt}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg)};
    return fetchToJson(url, config);
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhetId}` +
        '/portefoljestorrelser';
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `https://${window.location.hostname}${VEILARBSITUASJON_URL}/api/tilordneveileder/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(tilordninger) };
    return fetch(url, config).then(sjekkStatuskode);
}

export function hentStatusTall(enhetId) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhetId}/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForveileder(enhetId, veileder) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/veileder/${veileder}` +
        `/statustall?enhet=${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}
