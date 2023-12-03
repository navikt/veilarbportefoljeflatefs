import {FetchMockHandler} from '../index';
import {jsonResponse} from '../utils';
import FetchMock from 'yet-another-fetch-mock';

export const veilarbvedtaksstotteHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) => fetchMock.get('/veilarbvedtaksstotte/api/utrulling/erUtrullet', jsonResponse(true))
];
