import {delay, http, HttpResponse, RequestHandler} from 'msw';
import {innloggetVeileder} from '../data/innloggetVeileder';
import {withAuth} from './auth';
import {DEFAULT_DELAY_MILLISECONDS} from '../constants';

export const modiacontextholderHandlers: RequestHandler[] = [
    http.get(
        '/modiacontextholder/api/context/aktivenhet',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json({
                aktivBruker: null,
                aktivEnhet: '1234'
            });
        })
    ),
    http.get(
        '/modiacontextholder/api/context/aktivbruker',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json({
                aktivBruker: null,
                aktivEnhet: null
            });
        })
    ),
    http.delete(
        '/modiacontextholder/api/context/aktivbruker',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json({
                aktivBruker: null,
                aktivEnhet: null
            });
        })
    ),
    http.get(
        '/modiacontextholder/api/decorator',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json({
                enheter: innloggetVeileder.enheter,
                etternavn: innloggetVeileder.etternavn,
                fornavn: innloggetVeileder.fornavn,
                ident: innloggetVeileder.ident,
                navn: innloggetVeileder.navn
            });
        })
    ),
    http.get('https://app.adeo.no/modiacontextholder/api/decorator', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        return HttpResponse.json({
            enheter: innloggetVeileder.enheter,
            etternavn: innloggetVeileder.etternavn,
            fornavn: innloggetVeileder.fornavn,
            ident: innloggetVeileder.ident,
            navn: innloggetVeileder.navn
        });
    }),
    http.post(
        '/modiacontextholder/api/context',
        withAuth(async () => {
            return new HttpResponse(null, {status: 200});
        })
    ),
    http.get(
        '/modiacontextholder/api/context',
        withAuth(async () => {
            return HttpResponse.json({aktivBruker: '00000123456', aktivEnhet: null});
        })
    )
];
