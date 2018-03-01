import WebSocketImpl from './websocket-impl';

export enum EnhetConnectionState {
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected',
    FAILED = 'failed'
}

enum EventMessages {
    ESTABLISHED = 'Connection Established',
    PING = 'ping!',
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
    connectionState: EnhetConnectionState;
    callback: (event: EnhetContextEvent) => void;

    constructor(uri: string, cb: (action: EnhetContextEvent) => void) {
        this.callback = cb;
        this.connection = new WebSocketImpl(uri, this.onMessage.bind(this));
        this.connection.open();
    }

    public close() {
        this.connection.close();
    }

    private onMessage(e: MessageEvent) {
        if (e.data === EventMessages.ESTABLISHED || e.data === EventMessages.PING) {
            this.connectionState = EnhetConnectionState.CONNECTED;
            this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.CONNECTED });
        } else if(e.data === EventMessages.NY_AKTIV_ENHET) {
            this.callback({ type: EnhetContextEventNames.NY_AKTIV_ENHET });
        }
    }
}
