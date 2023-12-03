import {FetchMockHandler} from '../index';
import {jsonResponse} from '../utils';
import {hentSystemmeldinger} from '../data/systemmeldinger';
import FetchMock from 'yet-another-fetch-mock';

export const poaoSanityHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) =>
        fetchMock.get('https://poao-sanity.intern.nav.no/systemmeldinger', jsonResponse(hentSystemmeldinger()))
];
