import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { beholdAktivEnhet, endreAktivEnhet, settTilkoblingState, visAktivEnhetModal } from './context-reducer';
import { AppState } from '../../reducer';
import NyContextModal from './ny-context-modal';
import EnhetContextListener, {
    EnhetConnectionState, EnhetContextEvent,
    EnhetContextEventNames
} from './enhet-context-listener';

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
    contextListener: EnhetContextListener;

    constructor(props) {
        super(props);
        this.enhetContextHandler = this.enhetContextHandler.bind(this);
    }

    componentDidMount() {
        const uri = `wss://app-t4.adeo.no/modiaeventdistribution/websocket`;
        this.contextListener = new EnhetContextListener(uri, this.enhetContextHandler);
    }

    componentWillUnmount() {
        this.contextListener.close();
    }

    enhetContextHandler(event: EnhetContextEvent) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                const connected = event.state === EnhetConnectionState.CONNECTED;
                this.props.doSettTilkoblingState(connected);
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.props.doVisAktivEnhetModal();
                break;
        }
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
