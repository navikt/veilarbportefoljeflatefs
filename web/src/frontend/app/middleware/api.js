import { fetchToJson } from '../ducks/utils';
import { erDev } from './../utils/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = {
    credentials: 'same-origin',
    headers: {
        authorization: `Bearer ${sessionStorage.oidc}`
        }
    };

const VEILARBVEILEDER_URL = erDev() ? ':9590/veilarbveileder' : '/veilarbveileder';
const VEILARBPORTEFOLJE_URL = erDev() ? ':9594/veilarbportefolje' : '/veilarbportefolje';

export function hentEnheter() {
    const url = `https://${window.location.hostname}${VEILARBVEILEDER_URL}/tjenester/veileder/enheter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}

export function hentPortefolje(enhet, rekkefolge, fra, antall) {
    const url = `https://${window.location.hostname}${VEILARBPORTEFOLJE_URL}/tjenester/enhet/${enhet}/` +
                `portefolje?fra=${fra}&antall=${antall}&sortByLastName=${rekkefolge}`;
    return fetchToJson(url, MED_CREDENTIALS);
}
