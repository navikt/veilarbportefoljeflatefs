import {FetchMockHandler} from '../index';
import FetchMock from 'yet-another-fetch-mock';
import {jsonResponse} from '../utils';
import features from '../data/features';

export const veilarbportefoljeflatefsHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) => fetchMock.get('/veilarbportefoljeflatefs/api/feature', jsonResponse(features))
];
