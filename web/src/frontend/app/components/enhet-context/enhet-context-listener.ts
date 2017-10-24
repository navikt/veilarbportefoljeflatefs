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
    connection: WebSocket;
    connectionState: EnhetConnectionState;
    callback: (event: EnhetContextEvent) => void;
    closing: boolean = false;
    retryTimeout: number;
    hearthbeatInterval: number;

    constructor(uri: string, cb: (action: EnhetContextEvent) => void) {
        this.callback = cb;
        this.lagWebSocketConnection(uri);
    }

    public close() {
        this.closing = true;
        clearTimeout(this.retryTimeout);
        clearInterval(this.hearthbeatInterval);
        this.connection.close();
    }

    private lagWebSocketConnection(uri: string) {
        if (this.closing) {
            return;
        }

        this.connection = new WebSocket(uri);

        this.connection.onopen = (e) => {
            this.connection.send('Hello, World!');
            this.hearthbeatInterval = setInterval(() => {
                this.connection.send('Hello, World!');
            }, 30000);
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
            this.connectionState = EnhetConnectionState.FAILED;
            this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.FAILED });
        };

        this.connection.onclose = () => {
            clearInterval(this.hearthbeatInterval);
            if (!this.closing) {
                this.connectionState = EnhetConnectionState.FAILED;
                this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.FAILED });
                this.retryTimeout = setTimeout(() => this.lagWebSocketConnection(uri), 1000);
            } else {
                this.connectionState = EnhetConnectionState.NOT_CONNECTED;
                this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.NOT_CONNECTED });
            }
        };
    }
}
