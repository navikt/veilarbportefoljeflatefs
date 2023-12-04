import {http, HttpResponse, RequestHandler} from 'msw';
import {withAuth} from './auth';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.get(
        '/veilarbvedtaksstotte/api/utrulling/erUtrullet',
        withAuth(async () => {
            return HttpResponse.json(true);
        })
    )
];
