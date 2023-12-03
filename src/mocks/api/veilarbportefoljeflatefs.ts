import {http, HttpResponse, RequestHandler} from 'msw';
import features from '../../mocks-old/data/features';

export const veilarbportefoljeflatefsHandlers: RequestHandler[] = [
    http.get('/veilarbportefoljeflatefs/api/feature', async () => {
        return HttpResponse.json(features);
    })
];
