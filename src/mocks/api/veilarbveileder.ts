import {http, HttpResponse, RequestHandler} from 'msw';
import {innloggetVeileder} from '../data/innloggetVeileder';
import {veilederResponse} from '../data/veiledere';
import {withAuth} from './auth';

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get(
        '/veilarbveileder/api/veileder/v2/me',
        withAuth(async () => {
            return HttpResponse.json(innloggetVeileder);
        })
    ),
    http.get(
        '/veilarbveileder/api/enhet/:enhetId/veiledere',
        withAuth(async () => {
            return HttpResponse.json(veilederResponse);
        })
    ),
    http.get(
        '/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet',
        withAuth(async () => {
            return HttpResponse.json(true);
        })
    )
];
