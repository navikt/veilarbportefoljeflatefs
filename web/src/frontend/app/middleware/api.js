import { fetchToJson } from '../ducks/utils';

const API_BASE_URL = '/veilarbportefoljeflatefs/tjenester';
const MED_CREDENTIALS = { credentials: 'same-origin' };

export function hentEnheter() {
    return fetchToJson('http://a34duvw25985.devillo.no:9599/Portefolje-serverside/tjenester/hentenheter', MED_CREDENTIALS);

}

export function hentLedetekster() {
    return fetchToJson(`${API_BASE_URL}/tekster`, MED_CREDENTIALS);
}
