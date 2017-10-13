export enum EnhetConnectionState {
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected'
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
    connection: WebSocket;
    connectionState: EnhetConnectionState;
    callback: (event: EnhetContextEvent) => void;
    closing: boolean = false;
    retryTimeout: number;

    constructor(uri: string, cb: (action: EnhetContextEvent) => void) {
        this.callback = cb;
        this.lagWebSocketConnection(uri); // TODO: ikke hardkode
    }

    public close() {
        this.closing = true;
        clearTimeout(this.retryTimeout);
        this.connection.close();
    }

    private lagWebSocketConnection(uri: string) {
        if (this.closing) {
            return;
        }

        this.connection = new WebSocket(uri);

        this.connection.onopen = (e) => {
            this.connection.send('Hello, World!');
        };

        this.connection.onmessage = (e: MessageEvent) => {
            if (e.data === EventMessages.ESTABLISHED || e.data === EventMessages.PING) {
                this.connectionState = EnhetConnectionState.CONNECTED;
                this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.CONNECTED });
            } else if(e.data === EventMessages.NY_AKTIV_ENHET) {
                this.callback({ type: EnhetContextEventNames.NY_AKTIV_ENHET });
            }
        };

        this.connection.onerror = (e: ErrorEvent) => {
            this.connectionState = EnhetConnectionState.NOT_CONNECTED;
            this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.NOT_CONNECTED });
        };

        this.connection.onclose = () => {
            this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.NOT_CONNECTED });
            if (!this.closing) {
                this.connectionState = EnhetConnectionState.NOT_CONNECTED;
                this.retryTimeout = setTimeout(() => this.lagWebSocketConnection(uri), 1000);
            }
        };
    }
}
