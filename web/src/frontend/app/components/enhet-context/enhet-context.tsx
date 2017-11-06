import * as React from 'react';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { settNyAktivEnhet, settTilkoblingState, settIsPending, skjulFeilmodal, visFeilmodal } from './context-reducer';
import { AppState } from '../../reducer';
import NyContextModal from './ny-context-modal';
import EnhetContextListener, {
    EnhetConnectionState, EnhetContextEvent,
    EnhetContextEventNames
} from './enhet-context-listener';
import { hentAktivEnhet, oppdaterAktivEnhet } from './context-api';
import { erDev } from '../../utils/utils';
import { oppdaterValgtEnhet } from '../../ducks/enheter';
import { settEnhetIDekorator } from '../../eventhandtering';
import ContextFeilmodal from './context-feilmodal';

interface StateProps {
    modalSynlig: boolean;
    feilet: boolean;
    isPending: boolean;
    aktivEnhet: string;
    aktivEnhetNavn: string;
    aktivEnhetIdFraContext: string;
    feilmodalSynlig: boolean;
}

interface DispatchProps {
    doSettTilkoblingState: (state: EnhetConnectionState) => void;
    doSettNyAktivEnhet: (enhet: string) => void;
    doSettIsPending: (pending: boolean) => void;
    doOppdaterValgtEnhet: (enhet: string) => void;
    doVisFeilmodal: () => void;
    doSkjulFeilmodal: () => void;
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
                oppdaterAktivEnhet(this.props.aktivEnhet)
                    .catch(() => this.props.doVisFeilmodal());
            } else {
                this.props.doSettNyAktivEnhet(enhet);
            }
        });
    }

    componentWillUnmount() {
        this.contextListener.close();
    }

    handleEndreAktivEnhet() {
        settEnhetIDekorator(this.props.aktivEnhetIdFraContext);
        this.props.doOppdaterValgtEnhet(this.props.aktivEnhetIdFraContext);
    }

    handleBeholdAktivEnhet() {
        this.props.doSettIsPending(true);
        oppdaterAktivEnhet(this.props.aktivEnhet)
            .then(() => this.props.doSettNyAktivEnhet(this.props.aktivEnhet))
            .catch(() => this.props.doVisFeilmodal())
            .then(() => this.props.doSettIsPending(false));
    }

    handleNyAktivEnhet() {
        hentAktivEnhet()
            .then((nyEnhet) => this.props.doSettNyAktivEnhet(nyEnhet))
            .catch(() => this.props.doVisFeilmodal());
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
                <ContextFeilmodal
                    isOpen={this.props.feilmodalSynlig}
                    onClose={this.props.doSkjulFeilmodal}
                />
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
    const aktivEnhetIdFraContext = state.nycontext.aktivEnhetId;
    const aktivEnhetNavnFraContext = aktivEnhetIdFraContext && state.enheter.data.find((enhet) => enhet.enhetId === aktivEnhetIdFraContext).navn;

    const harValgtEnhet = valgtEnhetId != null && valgtEnhetId !== '' && aktivEnhetIdFraContext !== '';

    return {
        modalSynlig: harValgtEnhet && (valgtEnhetId !== aktivEnhetIdFraContext),
        feilmodalSynlig: state.nycontext.visFeilmodal,
        isPending: state.nycontext.isPending,
        feilet: state.nycontext.connected === EnhetConnectionState.FAILED,
        aktivEnhet: valgtEnhetId,
        aktivEnhetNavn: `${aktivEnhetIdFraContext} ${aktivEnhetNavnFraContext}`,
        aktivEnhetIdFraContext
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        doSettTilkoblingState: (state: EnhetConnectionState) => dispatch(settTilkoblingState(state)),
        doSettNyAktivEnhet: (enhet: string) => dispatch(settNyAktivEnhet(enhet)),
        doSettIsPending: (pending: boolean) => dispatch(settIsPending(pending)),
        doOppdaterValgtEnhet: (enhet: string) => dispatch(oppdaterValgtEnhet(enhet)),
        doVisFeilmodal: () => dispatch(visFeilmodal()),
        doSkjulFeilmodal: () => dispatch(skjulFeilmodal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhetContext);
