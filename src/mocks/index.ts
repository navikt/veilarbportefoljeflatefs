import {setupWorker} from 'msw/browser';
import {allHandlers} from './api';

export const worker = setupWorker(...allHandlers);

class MockWebSocket {
    constructor(uri: string) {
        // eslint-disable-next-line no-console
        console.log('MOCK WS: Tried to connect to: ' + uri);
    }

    addEventListener() {}

    close() {}
}

(window as any).WebSocket = MockWebSocket;
