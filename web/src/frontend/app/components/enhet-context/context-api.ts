import { fetchToJson } from '../../ducks/utils';

interface AktivenhetModell {
    aktivEnhet: string;
}

export function hentAktivEnhet(): Promise<string> {
    return fetchToJson<AktivenhetModell>(`/modiacontextholder/api/context/aktivenhet`)
        .then((data) => {
                return data.aktivEnhet;
            }
        );
}

export function oppdaterAktivEnhet(enhet: string): Promise<Response> {
    return fetch(`/modiacontextholder/api/context`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            verdi: enhet,
            eventType: 'NY_AKTIV_ENHET'
        })
    });
}
