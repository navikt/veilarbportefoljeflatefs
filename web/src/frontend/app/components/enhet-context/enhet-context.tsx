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
import { getEnhetFromUrl, miljoFraUrl } from '../../utils/url-utils';
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
    connected: EnhetConnectionState;
    feilmeldingTekstId: string;
}

interface DispatchProps {
    doSettTilkoblingState: (state: EnhetConnectionState) => void;
    doSettNyAktivEnhet: (enhet: string) => void;
    doSettIsPending: (pending: boolean) => void;
    doOppdaterValgtEnhet: (enhet: string) => void;
    doVisFeilmodal: (tekstId: string) => void;
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
        this.contextListener = new EnhetContextListener(this.websocketUri(), this.enhetContextHandler);

        this.finnOgSettEnhetIKontekst();
    }

    componentWillUnmount() {
        this.contextListener.close();
    }

    websocketUri() {
        const miljo = erDev() ? '-t4' : miljoFraUrl();
        return `wss://veilederflatehendelser${miljo}.adeo.no/modiaeventdistribution/websocket`;
    }

    finnOgSettEnhetIKontekst() {
        const enhetFraUrl = getEnhetFromUrl();

        if(enhetFraUrl !== '') {
            this.oppdaterEnhetIKontekstOgState(enhetFraUrl);
        } else {
            hentAktivEnhet().then((enhet) => {
                if (!enhet) {
                    this.oppdaterEnhetIKontekstOgState(this.props.aktivEnhet);
                } else {
                    this.props.doSettNyAktivEnhet(enhet);
                }
            });
        }
    }

    oppdaterEnhetIKontekstOgState(enhetId) {
        return oppdaterAktivEnhet(enhetId)
            .then(() => this.props.doSettNyAktivEnhet(enhetId))
            .catch(() => this.props.doVisFeilmodal("nyenhet.feilmodal.tekst"));
    }

    handleEndreAktivEnhet() {
        settEnhetIDekorator(this.props.aktivEnhetIdFraContext);
        this.props.doOppdaterValgtEnhet(this.props.aktivEnhetIdFraContext);
    }

    handleBeholdAktivEnhet() {
        this.props.doSettIsPending(true);
        this.oppdaterEnhetIKontekstOgState(this.props.aktivEnhet)
            .then(() => this.props.doSettIsPending(false));
    }

    doHentNyAktivEnhet() {
        hentAktivEnhet()
            .then((nyEnhet) => this.props.doSettNyAktivEnhet(nyEnhet))
            .catch(() => this.props.doVisFeilmodal("nyenhet.feilmodal.tekst"));
    }

    enhetContextHandler(event: EnhetContextEvent) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                if(event.state === EnhetConnectionState.FAILED &&
                    this.props.connected === EnhetConnectionState.NOT_CONNECTED) {
                    this.props.doVisFeilmodal("nyenhet.tilkobling.feilet");
                }
                this.props.doSettTilkoblingState(event.state);
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.doHentNyAktivEnhet();
                break;
        }
    }

    render() {
        return (
            <div>
                <ContextFeilmodal
                    isOpen={this.props.feilmodalSynlig}
                    onClose={this.props.doSkjulFeilmodal}
                    feilmeldingTekstId={this.props.feilmeldingTekstId}
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
        connected: state.nycontext.connected,
        aktivEnhet: valgtEnhetId,
        aktivEnhetNavn: `${aktivEnhetIdFraContext} ${aktivEnhetNavnFraContext}`,
        aktivEnhetIdFraContext,
        feilmeldingTekstId: state.nycontext.feilmodalTekstId
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        doSettTilkoblingState: (state: EnhetConnectionState) => dispatch(settTilkoblingState(state)),
        doSettNyAktivEnhet: (enhet: string) => dispatch(settNyAktivEnhet(enhet)),
        doSettIsPending: (pending: boolean) => dispatch(settIsPending(pending)),
        doOppdaterValgtEnhet: (enhet: string) => dispatch(oppdaterValgtEnhet(enhet)),
        doVisFeilmodal: (tekstId: string) => dispatch(visFeilmodal(tekstId)),
        doSkjulFeilmodal: () => dispatch(skjulFeilmodal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhetContext);
