import {http, HttpResponse, RequestHandler} from 'msw';
import {mockFeatureToggles} from '../data/mockfeatures';
import {withAuth} from './auth';

export const veilarbportefoljeflatefsHandlers: RequestHandler[] = [
    http.get(
        '/veilarbportefoljeflatefs/api/feature',
        withAuth(async () => {
            return HttpResponse.json(mockFeatureToggles);
        })
    )
];
