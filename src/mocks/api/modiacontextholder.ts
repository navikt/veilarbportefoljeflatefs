import {delay, http, HttpResponse, RequestHandler} from 'msw';
import innloggetVeileder from '../../mocks-old/data/innloggetVeileder';

export const modiacontextholderHandlers: RequestHandler[] = [
    http.get('/modiacontextholder/api/context/aktivenhet', async () => {
        await delay(500);
        return HttpResponse.json({
            aktivBruker: null,
            aktivEnhet: '1234'
        });
    }),
    http.get('/modiacontextholder/api/context/aktivbruker', async () => {
        await delay(500);
        return HttpResponse.json({
            aktivBruker: null,
            aktivEnhet: null
        });
    }),
    http.delete('/modiacontextholder/api/context/aktivbruker', async () => {
        await delay(500);
        return HttpResponse.json({
            aktivBruker: null,
            aktivEnhet: null
        });
    }),
    http.get('/modiacontextholder/api/decorator', async () => {
        await delay(500);
        return HttpResponse.json({
            enheter: innloggetVeileder.enheter,
            etternavn: innloggetVeileder.etternavn,
            fornavn: innloggetVeileder.fornavn,
            ident: innloggetVeileder.ident,
            navn: innloggetVeileder.navn
        });
    }),
    http.post('/modiacontextholder/api/context', async () => {
        return new HttpResponse(null, {status: 200});
    }),
    http.get('/modiacontextholder/api/context', async () => {
        return HttpResponse.json({aktivBruker: '00000123456', aktivEnhet: null});
    })
];
