import * as React from 'react';
import {AlertStripeAdvarselSolid} from 'nav-frontend-alertstriper';
import {connect} from "react-redux";
import {visAktivEnhetModal} from './context-reducer';
import {AppState} from '../../reducer';
import NyContextModal from './ny-context-modal';

enum ConnectionStates {
    CLOSING = 'closing',
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected'
}

enum Messages {
    ESTABLISHED = 'Connection Established',
    PING = 'Ping!',
    NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
}

interface StateProps {
    nyEnhetSynlig: boolean;
}

interface DispatchProps {
    doVisAktivEnhetModal: () => void;
}

type BrukerContextProps = StateProps & DispatchProps;

class BrukerContext extends React.Component<BrukerContextProps> {
    connection: WebSocket;
    connectionState: ConnectionStates;

    constructor(props) {
        super(props);
        this.connectionState = ConnectionStates.NOT_CONNECTED;
    }

    componentDidMount() {
        this.lagWebSocketConnection();
    }

    componentWillUnmount() {
        this.connectionState = ConnectionStates.CLOSING;
        this.connection.close();
    }

    lagWebSocketConnection() {
        if (this.connectionState === ConnectionStates.CLOSING) {
            return;
        }

        this.connection = new WebSocket(`wss://app-t4.adeo.no/modiaeventdistribution/websocket`);

        this.connection.onopen = (e) => {
            this.connection.send("hallo!");
        };

        this.connection.onmessage = (e: MessageEvent) => {
            if (e.data === Messages.ESTABLISHED) {
                this.connectionState = ConnectionStates.CONNECTED;
            } else if(e.data === Messages.NY_AKTIV_ENHET) {
                this.props.doVisAktivEnhetModal();
            }
        };

        this.connection.onerror = (e: ErrorEvent) => {
            console.error("Error i WS", e);
        };

        this.connection.onclose = () => {
            if (this.connectionState !== ConnectionStates.CLOSING) {
                this.connectionState = ConnectionStates.NOT_CONNECTED
            }
            setTimeout(() => this.lagWebSocketConnection(), 1000);
        }
    }

    render() {
        return (
            <AlertStripeAdvarselSolid>
                <div>
                    <span>Bruker i context aktivert, med status: { this.connectionState }</span>
                    <NyContextModal isOpen={this.props.nyEnhetSynlig}/>
                </div>
            </AlertStripeAdvarselSolid>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        nyEnhetSynlig: state.nycontext.nyEnhetModalSynlig,
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        doVisAktivEnhetModal: () => dispatch(visAktivEnhetModal()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BrukerContext);
