import {FetchMockHandler} from '../index';
import {delayed, jsonResponse} from '../utils';
import innloggetVeileder from '../data/innloggetVeileder';
import FetchMock from 'yet-another-fetch-mock';

export const modiacontextholderHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/modiacontextholder/api/context/aktivenhet',
            delayed(
                500,
                jsonResponse({
                    aktivBruker: null,
                    aktivEnhet: '1234'
                })
            )
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/modiacontextholder/api/context/aktivbruker',
            delayed(
                500,
                jsonResponse({
                    aktivBruker: null,
                    aktivEnhet: null
                })
            )
        ),
    (fetchMock: FetchMock) =>
        fetchMock.delete(
            '/modiacontextholder/api/context/aktivbruker',
            delayed(
                500,
                jsonResponse({
                    aktivBruker: null,
                    aktivEnhet: null
                })
            )
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/modiacontextholder/api/decorator',
            delayed(
                500,
                jsonResponse({
                    enheter: innloggetVeileder.enheter,
                    etternavn: innloggetVeileder.etternavn,
                    fornavn: innloggetVeileder.fornavn,
                    ident: innloggetVeileder.ident,
                    navn: innloggetVeileder.navn
                })
            )
        ),
    (fetchMock: FetchMock) =>
        fetchMock.post('/modiacontextholder/api/context', (req, res, ctx) => {
            return res(ctx.status(200));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.get('/modiacontextholder/api/context', (req, res, ctx) => {
            return res(ctx.json({aktivBruker: '00000123456', aktivEnhet: null}));
        })
];
