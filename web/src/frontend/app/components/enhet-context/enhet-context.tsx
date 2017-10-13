import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { beholdAktivEnhet, endreAktivEnhet, settTilkoblingState, visAktivEnhetModal } from './context-reducer';
import { AppState } from '../../reducer';
import NyContextModal from './ny-context-modal';

enum ConnectionStates {
    CLOSING = 'closing',
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected'
}

enum Messages {
    ESTABLISHED = 'Connection Established',
    PING = 'ping!',
    NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
}

interface StateProps {
    nyEnhetSynlig: boolean;
    tilkoblet: boolean;
}

interface DispatchProps {
    doVisAktivEnhetModal: () => void;
    doEndreAktivEnhet: () => void;
    doBeholdAktivEnhet: () => void;
    doSettTilkoblingState: (state: boolean) => void;
}

type EnhetContextProps = StateProps & DispatchProps;

class EnhetContext extends React.Component<EnhetContextProps> {
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

        this.connection = new WebSocket(`wss://app-t4.adeo.no/modiaeventdistribution/websocket`); // TODO: ikke hardkode

        this.connection.onopen = (e) => {
            this.connection.send('hallo!');
        };

        this.connection.onmessage = (e: MessageEvent) => {
            if (e.data === Messages.ESTABLISHED || e.data === Messages.PING) {
                this.connectionState = ConnectionStates.CONNECTED;
                this.props.doSettTilkoblingState(true);
            } else if(e.data === Messages.NY_AKTIV_ENHET) {
                this.props.doVisAktivEnhetModal();
            }
        };

        this.connection.onerror = (e: ErrorEvent) => {
            this.props.doSettTilkoblingState(false);
        };

        this.connection.onclose = () => {
            this.props.doSettTilkoblingState(false);
            if (this.connectionState !== ConnectionStates.CLOSING) {
                this.connectionState = ConnectionStates.NOT_CONNECTED;
            }
            setTimeout(() => this.lagWebSocketConnection(), 1000);
        };
    }

    render() {
        return (
            <div>
                <AlertStripe solid={true} type={ this.props.tilkoblet ? 'suksess' : 'advarsel' }>
                    <span>Bruker i context: { this.props.tilkoblet ? 'TILKOBLET' : 'IKKE TILKOBLET' }</span>
                </AlertStripe>
                <NyContextModal
                    isOpen={this.props.nyEnhetSynlig}
                    doEndreAktivEnhet={this.props.doEndreAktivEnhet}
                    doBeholdAktivEnhet={this.props.doBeholdAktivEnhet}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        nyEnhetSynlig: state.nycontext.nyEnhetModalSynlig,
        tilkoblet: state.nycontext.connected
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        doVisAktivEnhetModal: () => dispatch(visAktivEnhetModal()),
        doEndreAktivEnhet: () => dispatch(endreAktivEnhet()),
        doBeholdAktivEnhet: () => dispatch(beholdAktivEnhet()),
        doSettTilkoblingState: (state: boolean) => dispatch(settTilkoblingState(state))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhetContext);
