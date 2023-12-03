import {FetchMockHandler} from '../index';
import FetchMock from 'yet-another-fetch-mock';

function tildel(body: any) {
    return {feilendeTilordninger: []}; //uten feilende brukere
    //return {feilendeTilordninger: [body[0]]}; //noen feilende brukere
    //return {feilendeTilordninger: body}; //alle feilende brukere
}

export const veilarboppfolgingHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarboppfolging/api/tilordneveileder', ({body}, res, ctx) => res(ctx.json(tildel(body))))
];
