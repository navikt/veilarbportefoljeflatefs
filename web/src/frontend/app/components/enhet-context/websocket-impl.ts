const SECONDS: number = 1000;
const MINUTES: number = 60 * SECONDS;
const MAX_RETRIES: number = 30;

enum Status {
    INIT, OPEN, CLOSE
}

function fuzzy(min: number, max: number): number {
    const diff = max - min;
    const rnd = Math.round(Math.random() * diff);
    return min + rnd;
}

function createDelay(basedelay: number): number {
    return basedelay + fuzzy(5 * SECONDS, 15 * SECONDS);
}

function createRetrytime(tryCount: number): number {
    if (tryCount === MAX_RETRIES) {
        return Number.MAX_SAFE_INTEGER;
    }

    const basedelay = Math.min((Math.pow(2, tryCount)), 180) * SECONDS;
    return basedelay + fuzzy(5 * SECONDS, 15 * SECONDS);
}

class WebSocketImpl {
    private state: Status;
    private wsUrl: string;
    private onMessage: (event: MessageEvent) => void;
    private connection: WebSocket;
    private resettimer: number | null;
    private retrytimer: number | null;
    private retryCounter: number = 0;
    private debug: boolean = false;

    constructor(wsUrl: string, onMessage: (event: MessageEvent) => void) {
        this.wsUrl = wsUrl;
        this.onMessage = onMessage;
        this.state = Status.INIT;
    }

    open() {
        if (this.state === Status.CLOSE) {
            this.print('Stopping creation of WS, since it is closed');
            return;
        }

        this.connection = new WebSocket(this.wsUrl);
        this.connection.addEventListener('open', this.onWSOpen.bind(this));
        this.connection.addEventListener('message', this.onWSMessage.bind(this));
        this.connection.addEventListener('error', this.onWSError.bind(this));
        this.connection.addEventListener('close', this.onWSClose.bind(this));
    }

    close() {
        this.clearResetTimer();
        this.clearRetryTimer();
        this.state = Status.CLOSE;
        if (this.connection) {
            this.connection.close();
        }
    }

    onWSOpen(event) {
        this.print('open', event);
        this.clearResetTimer();
        this.clearRetryTimer();

        const delay = createDelay(45 * MINUTES);
        this.print('Creating resettimer', delay);

        this.resettimer = setTimeout(() => {
            this.connection.close();
        }, delay);

        this.state = Status.OPEN;
    }

    onWSMessage(event) {
        this.print('message', event);
        this.onMessage(event);
    }

    onWSError(event) {
        this.print('error', event);
    }

    onWSClose(event) {
        this.print('close', event);
        if (this.state !== Status.CLOSE) {
            const delay = createRetrytime(this.retryCounter++);
            this.print('Creating retrytimer', delay);

            this.retrytimer = setTimeout(this.open, delay);
        }
    }

    clearResetTimer() {
        if (this.resettimer) {
            clearTimeout(this.resettimer);
        }
        this.resettimer = null;
    }

    clearRetryTimer() {
        if (this.retrytimer) {
            clearTimeout(this.retrytimer);
        }
        this.retrytimer = null;
        this.retryCounter = 0;
    }

    print(...args) {
        if (this.debug) {
            console.log(...args); // tslint:disable-line
        }
    }
}

export default WebSocketImpl;
