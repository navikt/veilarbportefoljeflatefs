import {http, HttpResponse, RequestHandler} from 'msw';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.get('/veilarbvedtaksstotte/api/utrulling/erUtrullet', async () => {
        return HttpResponse.json(true);
    })
];
