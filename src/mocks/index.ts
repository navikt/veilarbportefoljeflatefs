import FetchMock, {MiddlewareUtils, MockRequest, ResponseData} from 'yet-another-fetch-mock';
import {veilarbveilederHandlers} from './api/veilarbveileder';
import {veilarbportefoljeflatefsHandlers} from './api/veilarbportefoljeflatefs';
import {veilarbfilterHandlers} from './api/veilarbfilter';
import {veilarbportefoljeHandlers} from './api/veilarbportefolje';
import {modiacontextholderHandlers} from './api/modiacontextholder';
import {poaoEndringsloggHandlers} from './api/poao-endringslogg';
import {authHandlers, sesjonUtlopt} from './api/auth';
import {veilarbvedtaksstotteHandlers} from './api/veilarbvedtaksstotte';
import {veilarboppfolgingHandlers} from './api/veilarboppfolging';
import {poaoSanityHandlers} from './api/poao-sanity';

export type FetchMockHandler = (fetchMock: FetchMock) => void;

const fetchMock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(100),
        MiddlewareUtils.loggingMiddleware(),
        (request: MockRequest, response: ResponseData) => {
            if (sesjonUtlopt()) {
                return {status: 401};
            } else {
                return response;
            }
        }
    )
});

veilarbportefoljeflatefsHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
veilarbfilterHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
veilarbveilederHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
veilarbportefoljeHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
modiacontextholderHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
poaoEndringsloggHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
authHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
veilarbvedtaksstotteHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
veilarboppfolgingHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));
poaoSanityHandlers.forEach((fetchMockHandler: FetchMockHandler) => fetchMockHandler(fetchMock));

// websocket
class MockWebSocket {
    constructor(uri: string) {
        // eslint-disable-next-line no-console
        console.log('MOCK WS: Tried to connect to: ' + uri);
    }

    addEventListener() {}

    close() {}
}

(window as any).WebSocket = MockWebSocket;
