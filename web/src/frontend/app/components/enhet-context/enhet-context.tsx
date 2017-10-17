import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { settNyAktivEnhet, settTilkoblingState } from './context-reducer';
import { AppState } from '../../reducer';
import NyContextModal from './ny-context-modal';
import EnhetContextListener, {
    EnhetConnectionState, EnhetContextEvent,
    EnhetContextEventNames
} from './enhet-context-listener';
import { hentAktivEnhet, oppdaterAktivEnhet } from './context-api';
import { leggEnhetIUrl } from '../../utils/utils';

interface StateProps {
    modalSynlig: boolean;
    tilkoblet: boolean;
    aktivEnhet: string;
    aktivEnhetContext: string;
}

interface DispatchProps {
    doSettTilkoblingState: (state: boolean) => void;
    doSettNyAktivEnhet: (enhet: string) => void;
}

type EnhetContextProps = StateProps & DispatchProps;

class EnhetContext extends React.Component<EnhetContextProps> {
    contextListener: EnhetContextListener;

    constructor(props) {
        super(props);
        this.enhetContextHandler = this.enhetContextHandler.bind(this);
        this.handleEndreAktivEnhet = this.handleEndreAktivEnhet.bind(this);
        this.handleBeholdAktivEnhet = this.handleBeholdAktivEnhet.bind(this);
    }

    componentDidMount() {
        const uri = `wss://app-t4.adeo.no/modiaeventdistribution/websocket`;
        this.contextListener = new EnhetContextListener(uri, this.enhetContextHandler);
    }

    componentWillUnmount() {
        this.contextListener.close();
    }

    handleEndreAktivEnhet() {
        leggEnhetIUrl(this.props.aktivEnhetContext);
    }

    handleBeholdAktivEnhet() {
        oppdaterAktivEnhet(this.props.aktivEnhet)
            .then(() => this.props.doSettNyAktivEnhet(this.props.aktivEnhet));
    }

    handleNyAktivEnhet() {
        hentAktivEnhet().then((nyEnhet) => {
            this.props.doSettNyAktivEnhet(nyEnhet);
        });
    }

    enhetContextHandler(event: EnhetContextEvent) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                const connected = event.state === EnhetConnectionState.CONNECTED;
                this.props.doSettTilkoblingState(connected);
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.handleNyAktivEnhet();
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
                    isOpen={this.props.modalSynlig}
                    aktivEnhet={this.props.aktivEnhet}
                    doEndreAktivEnhet={this.handleEndreAktivEnhet}
                    doBeholdAktivEnhet={this.handleBeholdAktivEnhet}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const valgtEnhet = state.enheter.valgtEnhet.enhet;
    const valgtEnhetId = valgtEnhet ? valgtEnhet.enhetId : '';
    const valgtEnhetContext = state.nycontext.aktivEnhet;

    return {
        modalSynlig: valgtEnhetId !== valgtEnhetContext,
        tilkoblet: state.nycontext.connected,
        aktivEnhet: valgtEnhet == null ? '' : valgtEnhet.enhetId,
        aktivEnhetContext: valgtEnhetContext
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        doSettTilkoblingState: (state: boolean) => dispatch(settTilkoblingState(state)),
        doSettNyAktivEnhet: (enhet: string) => dispatch(settNyAktivEnhet(enhet))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhetContext);
