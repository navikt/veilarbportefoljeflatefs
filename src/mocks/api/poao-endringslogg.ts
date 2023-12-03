import {http, HttpResponse, RequestHandler} from 'msw';
import {endringsloggListe} from '../data/endringslogg';

export const poaoEndringsloggHandlers: RequestHandler[] = [
    http.post('https://poao-endringslogg.intern.nav.no/analytics/session-duration', async () => {
        return HttpResponse.json([]);
    }),
    http.post('https://poao-endringslogg.intern.nav.no/endringslogg', async () => {
        return HttpResponse.json(endringsloggListe);
    }),
    http.post('https://poao-endringslogg.intern.nav.no/analytics/session-duration', async () => {
        return HttpResponse.json([]);
    }),
    http.patch('https://poao-endringslogg.intern.nav.no/analytics/modal-open', async () => {
        return HttpResponse.json([]);
    })
];
