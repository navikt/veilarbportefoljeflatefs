import innloggetVeileder from '../../mocks-old/data/innloggetVeileder';
import {veilederResponse} from '../../mocks-old/data/veiledere';
import {http, HttpResponse, RequestHandler} from 'msw';

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get('/veilarbveileder/api/veileder/v2/me', async () => {
        return HttpResponse.json(innloggetVeileder);
    }),
    http.get('/veilarbveileder/api/enhet/:enhetId/veiledere', async () => {
        return HttpResponse.json(veilederResponse);
    }),
    http.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', async () => {
        return HttpResponse.json(true);
    })
];
