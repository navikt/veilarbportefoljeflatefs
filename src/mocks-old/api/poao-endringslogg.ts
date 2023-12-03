import {FetchMockHandler} from '../index';
import {endringsloggListe} from '../data/endringslogg';
import FetchMock from 'yet-another-fetch-mock';

export const poaoEndringsloggHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) =>
        fetchMock.post('https://poao-endringslogg.intern.nav.no/analytics/session-duration', (req, res, ctx) => {
            return res(ctx.json([]));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.post('https://poao-endringslogg.intern.nav.no/endringslogg', (req, res, ctx) => {
            return res(ctx.json(endringsloggListe));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.post('https://poao-endringslogg.intern.nav.no/analytics/session-duration', (req, res, ctx) => {
            return res(ctx.json([]));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.patch('https://poao-endringslogg.intern.nav.no/analytics/modal-open', (req, res, ctx) =>
            res(ctx.json([]))
        )
];
