/* eslint-disable no-undef*/
import { fetchToJson, sjekkStatuskode } from '../ducks/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

const VEILARBVEILEDER_URL = '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = '/veilarbportefolje';
const VEILARBSITUASJON_URL = '/veilarbsituasjon';

export function hentVeiledersEnheter() {
    const url = `${VEILARBVEILEDER_URL}/tjenester/veileder/enheter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, fra, antall, filtervalg) {
    const url = `${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhet}/` +
        `portefolje?fra=${fra}&antall=${antall}&sortDirection=${rekkefolge}&sortField=${sorteringsfelt}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentVeiledersPortefolje(enhet, veilederident, rekkefolge, sorteringsfelt, fra, antall, filtervalg) {
    const url = `${VEILARBPORTEFOLJE_URL}/tjenester/veileder/` +
        `${veilederident}/portefolje?enhet=${enhet}&fra=${fra}&antall=${antall}` +
        `&sortDirection=${rekkefolge}&sortField=${sorteringsfelt}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentDiagramdata(enhet, veilederident, filtervalg) {
    let url = `${VEILARBPORTEFOLJE_URL}/tjenester/diagram/` +
        `?enhet=${enhet}`;

    if (veilederident) {
        url += `&veilederident=${veilederident}`;
    }

    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `${VEILARBVEILEDER_URL}/tjenester/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhetId}` +
        '/portefoljestorrelser';
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `${VEILARBSITUASJON_URL}/api/tilordneveileder/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(tilordninger) };
    return fetch(url, config).then(sjekkStatuskode);
}

export function hentStatusTall(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhetId}/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForveileder(enhetId, veileder) {
    const url = `${VEILARBPORTEFOLJE_URL}/tjenester/veileder/${veileder}` +
        `/statustall?enhet=${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function leggTilArbeidsliste(arbeidsliste) {
    const url = `${VEILARBPORTEFOLJE_URL}/tjenester/arbeidsliste/${arbeidsliste[0].brukerFnr}`; //TODO: backend må endres så man kan sende på veilderIdent fremfor per bruker (fnr)
    const config = { ...MED_CREDENTIALS, method: 'put', body: JSON.stringify(arbeidsliste) };
    return fetch(url, config).then(sjekkStatuskode);
}
