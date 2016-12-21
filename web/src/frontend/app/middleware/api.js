import { fetchToJson } from '../ducks/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = { credentials: 'same-origin' };

export function hentEnheter() {
    const url = 'http://' + window.location.hostname + ':9599/Portefolje-serverside/tjenester/hentenheter';
    return fetchToJson(url, MED_CREDENTIALS);

}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}
