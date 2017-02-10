import { fetchToJson } from '../ducks/utils';
import { erDev } from './../utils/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = { credentials: 'same-origin' };

const VEILARBVEILEDER_URL = erDev() ? ':9590/veilarbveileder' : '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = erDev() ? ':9594/veilarbportefolje' : '/veilarbportefolje';

export function hentVeiledersEnheter(ident) {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/veileder/${ident}/enheter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentEnhetsPortefolje(enhet, ident, rekkefolge, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/portefolje/` +
                `enhet/${enhet}?ident=${ident}&fra=${fra}&antall=${antall}&sortByLastName=${rekkefolge}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentVeiledersPortefolje(ident, enhet, veilederident, rekkefolge, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/portefolje/enhet/${enhet}/` +
        `veileder/${veilederident}?ident=${ident}&fra=${fra}&antall=${antall}&sortByLastName=${rekkefolge}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentEnhetsVeiledere(enhetId, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/enhet/${enhetId}/veiledere` +
        `?fra=${fra}&antall=${antall}`;
    return fetchToJson(url, MED_CREDENTIALS);
}
