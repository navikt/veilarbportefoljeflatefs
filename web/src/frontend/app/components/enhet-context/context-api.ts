import {fetchToJson, sjekkStatuskode} from '../../ducks/utils';

const MED_CREDENTIALS: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
};

interface AktivenhetModell {
    aktivEnhet: string;
}

export function hentAktivEnhet(): Promise<string> {
    return fetchToJson<AktivenhetModell>(`/modiacontextholder/api/context/aktivenhet`, MED_CREDENTIALS)
        .then((data) => {
                return data.aktivEnhet;
            }
        );
}

export function oppdaterAktivEnhet(enhet: string): Promise<Response> {
    return fetch(`/modiacontextholder/api/context`, {
        ...MED_CREDENTIALS,
        method: 'post',
        body: JSON.stringify({
            verdi: enhet,
            eventType: 'NY_AKTIV_ENHET'
        })
    }).then(sjekkStatuskode);
}
