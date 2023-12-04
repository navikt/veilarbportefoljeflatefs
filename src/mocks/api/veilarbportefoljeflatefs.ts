import {http, HttpResponse, RequestHandler} from 'msw';
import features from '../data/features';
import {withAuth} from './auth';

export const veilarbportefoljeflatefsHandlers: RequestHandler[] = [
    http.get(
        '/veilarbportefoljeflatefs/api/feature',
        withAuth(async () => {
            return HttpResponse.json(features);
        })
    )
];
