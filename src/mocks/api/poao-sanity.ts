import {http, HttpResponse, RequestHandler} from 'msw';
import {hentSystemmeldinger} from '../../mocks-old/data/systemmeldinger';

export const poaoSanityHandlers: RequestHandler[] = [
    http.get('https://poao-sanity.intern.nav.no/systemmeldinger', async () => {
        return HttpResponse.json(hentSystemmeldinger());
    })
];
