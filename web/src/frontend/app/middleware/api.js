import { fetchToJson } from '../ducks/utils';
import { erDev } from './../utils/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = { credentials: 'same-origin' };

const VEILARBVEILEDERAPI_URL = erDev() ? ':9590/veilarbveilederapi' : '/veilarbveilederapi';

export function hentEnheter(ident) {
    const url = `https://${window.location.hostname}${VEILARBVEILEDERAPI_URL}/tjenester/hentenheter/${ident}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}
