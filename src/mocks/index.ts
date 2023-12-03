import {setupWorker} from 'msw/browser';
import {allHandlers} from './api';

export const worker = setupWorker(...allHandlers);

// TODO: Implementer tilsvarende middleware/request interceptor som tidligere ble bruk ifm. yet-another-fetch-mock
// (request: MockRequest, response: ResponseData) => {
//     if (sesjonUtlopt()) {
//         return {status: 401};
//     } else {
//         return response;
//     }
// }

class MockWebSocket {
    constructor(uri: string) {
        // eslint-disable-next-line no-console
        console.log('MOCK WS: Tried to connect to: ' + uri);
    }

    addEventListener() {}

    close() {}
}

(window as any).WebSocket = MockWebSocket;
