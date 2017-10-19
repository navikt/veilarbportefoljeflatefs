import * as React from 'react';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { settNyAktivEnhet, settTilkoblingState, settIsPending } from './context-reducer';
import { AppState } from '../../reducer';
import NyContextModal from './ny-context-modal';
import EnhetContextListener, {
    EnhetConnectionState, EnhetContextEvent,
    EnhetContextEventNames
} from './enhet-context-listener';
import { hentAktivEnhet, oppdaterAktivEnhet } from './context-api';
import {erDev, leggEnhetIUrl} from '../../utils/utils';

interface StateProps {
    modalSynlig: boolean;
    feilet: boolean;
    isPending: boolean;
    aktivEnhet: string;
    aktivEnhetNavn: string;
    aktivEnhetContext: string;
}

interface DispatchProps {
    doSettTilkoblingState: (state: EnhetConnectionState) => void;
    doSettNyAktivEnhet: (enhet: string) => void;
    doSettIsPending: (pending: boolean) => void;
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
        const host = erDev() ? 'app-t4.adeo.no' : window.location.hostname;
        const uri = `wss://${host}/modiaeventdistribution/websocket`;
        this.contextListener = new EnhetContextListener(uri, this.enhetContextHandler);

        hentAktivEnhet().then((enhet) => {
            if (!enhet) {
                oppdaterAktivEnhet(this.props.aktivEnhet);
            } else {
                this.props.doSettNyAktivEnhet(enhet);
            }
        });
    }

    componentWillUnmount() {
        this.contextListener.close();
    }

    handleEndreAktivEnhet() {
        leggEnhetIUrl(this.props.aktivEnhetContext, true);
    }

    handleBeholdAktivEnhet() {
        this.props.doSettIsPending(true);
        oppdaterAktivEnhet(this.props.aktivEnhet)
            .then(() => this.props.doSettNyAktivEnhet(this.props.aktivEnhet))
            .then(() => this.props.doSettIsPending(false));
    }

    handleNyAktivEnhet() {
        hentAktivEnhet().then((nyEnhet) => {
            this.props.doSettNyAktivEnhet(nyEnhet);
        });
    }

    enhetContextHandler(event: EnhetContextEvent) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                this.props.doSettTilkoblingState(event.state);
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.handleNyAktivEnhet();
                break;
        }
    }

    render() {

        const alertIkkeTilkoblet = (
            <AlertStripeAdvarselSolid>
                <FormattedMessage id="nyenhet.tilkobling.feilet" />
            </AlertStripeAdvarselSolid>
        );

        return (
            <div>
                { this.props.feilet ? alertIkkeTilkoblet : null }
                <NyContextModal
                    isOpen={this.props.modalSynlig}
                    aktivEnhet={this.props.aktivEnhetNavn}
                    isPending={this.props.isPending}
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
    const valgtEnhetNavn = valgtEnhet ? state.enheter.data.find((enhet) => enhet.enhetId === valgtEnhetId).navn : '';
    const valgtEnhetContext = state.nycontext.aktivEnhet;

    const harValgtEnhet = valgtEnhetId != null && valgtEnhetId != '';

    return {
        modalSynlig: harValgtEnhet && (valgtEnhetId !== valgtEnhetContext),
        isPending: state.nycontext.isPending,
        feilet: state.nycontext.connected === EnhetConnectionState.FAILED,
        aktivEnhet: valgtEnhetId,
        aktivEnhetNavn: `${valgtEnhetId} ${valgtEnhetNavn}`,
        aktivEnhetContext: valgtEnhetContext
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        doSettTilkoblingState: (state: EnhetConnectionState) => dispatch(settTilkoblingState(state)),
        doSettNyAktivEnhet: (enhet: string) => dispatch(settNyAktivEnhet(enhet)),
        doSettIsPending: (pending: boolean) => dispatch(settIsPending(pending)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhetContext);
