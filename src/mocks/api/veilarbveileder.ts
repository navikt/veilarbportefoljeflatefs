import FetchMock from 'yet-another-fetch-mock';
import {jsonResponse} from '../utils';
import innloggetVeileder from '../data/innloggetVeileder';
import {veilederResponse} from '../data/veiledere';
import {FetchMockHandler} from '../index';

export const veilarbveilederHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) => fetchMock.get('/veilarbveileder/api/veileder/v2/me', jsonResponse(innloggetVeileder)),
    (fetchMock: FetchMock) =>
        fetchMock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', jsonResponse(veilederResponse)),
    (fetchMock: FetchMock) =>
        fetchMock.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', jsonResponse(true))
];
