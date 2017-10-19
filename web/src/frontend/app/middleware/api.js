/* eslint-disable no-undef */
import { fetchToJson, sjekkStatuskode } from '../ducks/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/api';
const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

const VEILARBVEILEDER_URL = '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = '/veilarbportefolje/api';
const VEILARBSITUASJON_URL = '/veilarbsituasjon';

export function hentVeiledersEnheter() {
    const url = `${VEILARBVEILEDER_URL}/api/veileder/enheter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, fra, antall, filtervalg) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/` +
        `portefolje?fra=${fra}&antall=${antall}&sortDirection=${rekkefolge}&sortField=${sorteringsfelt}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentVeiledersPortefolje(enhet, veilederident, rekkefolge, sorteringsfelt, fra, antall, filtervalg) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/` +
        `${veilederident}/portefolje?enhet=${enhet}&fra=${fra}&antall=${antall}` +
        `&sortDirection=${rekkefolge}&sortField=${sorteringsfelt}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentDiagramdata(enhet, veilederident, filtervalg) {
    let url = `${VEILARBPORTEFOLJE_URL}/diagram/` +
        `?enhet=${enhet}`;

    if (veilederident) {
        url += `&veilederident=${veilederident}`;
    }

    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `${VEILARBVEILEDER_URL}/api/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}` +
        '/portefoljestorrelser';
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `${VEILARBSITUASJON_URL}/api/tilordneveileder/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(tilordninger) };
    return fetch(url, config).then(sjekkStatuskode);
}

export function hentStatusTall(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForveileder(enhetId, veileder) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veileder}` +
        `/statustall?enhet=${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function httpArbeidsliste(arbeidsliste, method, additionalPath = '') {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste/${additionalPath}`;
    const config = { ...MED_CREDENTIALS, method, body: JSON.stringify(arbeidsliste) };
    return fetchToJson(url, config);
}

export function hentEnhetTiltak(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/tiltak`;
    return fetchToJson(url, MED_CREDENTIALS);
}
