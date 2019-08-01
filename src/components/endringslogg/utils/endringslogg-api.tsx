import { sjekkStatuskode } from '../../../ducks/utils';

const credentials = 'same-origin';

const MED_CREDENTIALS: RequestInit = {
    credentials,
    headers: {
        'Content-Type': 'application/json',
    }
};
export const REMOTE_STORE_URL = '/veilarbremotestore/';

export function fetchHarSettInnlegg(): Promise<{endringslogg: string}> | null {
    return fetch(`${REMOTE_STORE_URL}?ressurs=endringslogg`, {credentials: 'same-origin'})
    .then(responsToJson)
    .catch(
        () => {
            return null;
        }
    );
}

function responsToJson(response) {
if(response.status === 504) { // Internal error
    return null;
}
if (response.status !== 204) { // No content
    return response.json();
}
return response;
}

export function registrerSettInnlegg(message: string) {
patchRemoteStorage(message, `${REMOTE_STORE_URL}`);
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
