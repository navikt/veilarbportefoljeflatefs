import { sjekkStatuskode } from '../../../ducks/utils';

const credentials = 'same-origin';

const MED_CREDENTIALS: RequestInit = {
    credentials,
    headers: {
        'Content-Type': 'application/json',
    }
};
export const REMOTE_STORE_URL = '/veilarbremotestore/api/';

export function fetchHarSettInnlegg(): Promise<{ endringslogg: string }> {
    return fetch(`${REMOTE_STORE_URL}?ressurs=endringslogg`, {credentials: 'same-origin', method: 'GET'})
        .then(responseToJson);
}

function responseToJson(response) {
    if (response.status >= 500) { // Internal error
        throw Error('Bad response 500');
    }
    if (response.status !== 204) { // No content
        return response.json();
    }
    return response;
}

export function registrerSettInnlegg(message: string) {
    patchRemoteStorage(message, `/veilarbremotestore/`);
}

function patchRemoteStorage(data: string, url: string): Promise<Response> {
    return fetch(url, {
        ...MED_CREDENTIALS,
        method: 'PATCH',
        body: JSON.stringify({
            endringslogg: data
        })
    }).then(sjekkStatuskode);
}
