import {http, HttpResponse, RequestHandler} from 'msw';

export const poaoSanityHandlers: RequestHandler[] = [
    http.get('https://poao-sanity.intern.nav.no/systemmeldinger', async () => {
        return HttpResponse.json([]);
    })
];
