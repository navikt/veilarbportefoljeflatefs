import * as React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
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
import { EnhetModell } from '../../model-interfaces';

interface StateProps {
    modalSynlig: boolean;
    feilet: boolean;
    ident?: string;
    isPending: boolean;
    aktivEnhet: string;
    aktivEnhetNavn: string;
    aktivEnhetIdFraContext: string;
    feilmodalSynlig: boolean;
    enheter: EnhetModell[];
}

interface DispatchProps {
    doSettTilkoblingState: (state: EnhetConnectionState) => void;
    doSettNyAktivEnhet: (enhet: string) => void;
    doSettIsPending: (pending: boolean) => void;
    doOppdaterValgtEnhet: (enhet: string) => void;
    doVisFeilmodal: () => void;
    doSkjulFeilmodal: () => void;
}

type EnhetContextProps = {children: React.ReactNode} & StateProps & DispatchProps;

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
        const miljo = erDev() ? '-t6' : miljoFraUrl();
        return `wss://veilederflatehendelser${miljo}.adeo.no/modiaeventdistribution/ws/${this.props.ident}`;
    }

    finnOgSettEnhetIKontekst() {
        const { enheter } = this.props;
        const enhetFraUrl = getEnhetFromUrl();
        const nyEnhet = enheter.map((enhet) => enhet.enhetId).includes(enhetFraUrl) ? enhetFraUrl : enheter[0].enhetId;
        if(nyEnhet !== '') {
            this.oppdaterEnhetIKontekstOgState(nyEnhet);
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
            .catch(() => this.props.doVisFeilmodal());
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
            .catch(() => this.props.doVisFeilmodal());
    }

    enhetContextHandler(event: EnhetContextEvent) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                this.props.doSettTilkoblingState(event.state);
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.doHentNyAktivEnhet();
                break;
        }
    }

    render() {

        const alertIkkeTilkoblet = (
            <Alertstripe type="feil">
                Det er fare for at du kan ha forskjellige brukere i forskjellige flater/vinduer.
                Systemet feiler og klarer ikke oppfatte endringer du eventuelt har gjort i andre vinuer.
            </Alertstripe>
        );

        return (
            <>
                <>
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
                </>
                {this.props.children}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const valgtEnhet = state.enheter.valgtEnhet.enhet;
    const valgtEnhetId = valgtEnhet ? valgtEnhet.enhetId : '';
    const aktivEnhetIdFraContext = state.nycontext.aktivEnhetId;
    const aktivEnhetNavnFraContext = state.enheter.data.map((enhet) => enhet.enhetId).includes(aktivEnhetIdFraContext)
        && state.enheter.data.find((enhet) => enhet.enhetId === aktivEnhetIdFraContext).navn;
    const harValgtEnhet = valgtEnhetId != null && valgtEnhetId !== '' && aktivEnhetIdFraContext !== '';
    return {
        enheter: state.enheter.data,
        ident: state.enheter.ident,
        modalSynlig: harValgtEnhet && (valgtEnhetId !== aktivEnhetIdFraContext),
        feilmodalSynlig: state.nycontext.visFeilmodal,
        isPending: state.nycontext.isPending,
        feilet: state.nycontext.failed,
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
