import { fetchToJson } from '../ducks/utils';
import { erDev } from './../utils/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = { credentials: 'same-origin' };

const VEILARBVEILEDER_URL = erDev() ? ':9590/veilarbveileder' : '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = erDev() ? ':9594/veilarbportefolje' : '/veilarbportefolje';

export function hentEnheter(ident) {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/hentenheter/${ident}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentPortefolje(enhet, ident, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}` +
        `/tjenester/hentportefoljeforenhet/${enhet}?ident=${ident}&fra=${fra}&antall=${antall}`;
    return fetchToJson(url, MED_CREDENTIALS);
}
