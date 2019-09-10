import WebSocketImpl from './websocket-impl';

const frontendlogger = (window as any).frontendlogger;
const warn = (frontendlogger && frontendlogger.warn) || (() => null);

export enum EnhetConnectionState {
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected',
    FAILED = 'failed'
}

export enum EventMessages {
    NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
}

export enum EnhetContextEventNames {
    CONNECTION_STATE_CHANGED = 'connection_state_changed',
    NY_AKTIV_ENHET = 'ny_aktiv_enhet'
}

interface ConnectionStateChanged {
    type: EnhetContextEventNames.CONNECTION_STATE_CHANGED;
    state: EnhetConnectionState;
}

interface NyAktivEnhet {
    type: EnhetContextEventNames.NY_AKTIV_ENHET;
}

export type EnhetContextEvent = ConnectionStateChanged | NyAktivEnhet;

export default class EnhetContextListener {
    connection: WebSocketImpl;
    callback: (event: EnhetContextEvent) => void;

    constructor(uri: string, cb: (action: EnhetContextEvent) => void) {
        this.callback = cb;
        this.connection = new WebSocketImpl(uri, {
            onOpen: this.onOpen.bind(this),
            onMessage: this.onMessage.bind(this),
            onError: this.onError.bind(this),
            onClose: this.onClose.bind(this)
        });
        this.connection.open();
    }

    public close() {
        this.connection.close();
    }

    private onOpen(e: Event) {
        this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.CONNECTED });
    }

    private onMessage(e: MessageEvent) {
         if(e.data === EventMessages.NY_AKTIV_ENHET) {
            this.callback({ type: EnhetContextEventNames.NY_AKTIV_ENHET });
        }
    }

    private onError(errorEvent: ErrorEvent) {
        this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.FAILED });
        const webSocket = (errorEvent.srcElement as any);
        warn({
            ...errorEvent,
            websocketUrl: webSocket && webSocket.url
        });
    }

    private onClose() {
        this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.NOT_CONNECTED });
    }
}
