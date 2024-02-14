import {combineReducers} from 'redux';
import persistentReducer from './utils/persistentReducer';
import valgtEnhetReducer, {ValgtEnhetState} from './ducks/valgt-enhet';
import portefoljeReducer, {PortefoljeState} from './ducks/portefolje';
import pagineringReducer from './ducks/paginering';
import sorteringReducer from './ducks/sortering';
import veiledereReducer, {VeiledereState} from './ducks/veiledere';
import portefoljestorrelserReducer, {PortefoljeStorrelser} from './ducks/portefoljestorrelser';
import filtreringReducer, {initialState} from './ducks/filtrering';
import statustallVeilederReducer, {StatustallVeilederState} from './ducks/statustall-veileder';
import systemmeldingerReducer, {SystemmeldingState} from './ducks/systemmeldinger';
import modalReducer from './ducks/modal';
import serverfeilModalReducer from './ducks/modal-serverfeil';
import feilmedlingModalReducer from './ducks/modal-feilmelding-brukere';
import veiledergrupperLagretFilterReducer from './ducks/veiledergrupper_filter';
import arbeidslisteReducer from './ducks/arbeidsliste';
import enhetTiltakReducer, {EnhettiltakState} from './ducks/enhettiltak';
import listevisningReducer, {
    initialStateEnhetensOversikt,
    initialStateMinOversikt,
    ListevisningState,
    OversiktType
} from './ducks/ui/listevisning';
import featuresReducer, {FeaturesState} from './ducks/features';
import toastReducer, {ToastState} from './store/toast/reducer';
import {FiltervalgModell} from './model-interfaces';
import innloggetVeilederReducer, {InnloggetVeilederState} from './ducks/innlogget-veileder';
import sidebarReducer, {initialStateSidebar} from './ducks/sidebar-tab';
import mineFilterReducer from './ducks/mine-filter';
import lagretFilterUIState, {LagretFilterUIState} from './ducks/lagret-filter-ui-state';
import {LagretFilterState} from './ducks/lagret-filter';
import geografiskbostedListReducer, {GeografiskBostedListState} from './ducks/geografiskBosted';
import foedelandListReducer, {FoedelandListState} from './ducks/foedeland';
import tolkebehovListReducer, {TolkebehovSpraakListState} from './ducks/tolkebehov';
import informasjonsmeldingReducer, {SesjonStatusState} from './ducks/informasjonsmelding';
import brukerfeilReducer, {BrukerfeilState} from './ducks/brukerfeilmelding';
import statustallEnhetReducer, {StatustallEnhetState} from './ducks/statustall-enhet';
import brukerIKontekstReducer, {BrukerIKontekstState} from './ducks/bruker-i-kontekst';
import huskelappReducer from './ducks/huskelapp';

function named(name, reducer) {
    return (state, action) => {
        if (state === undefined) {
            // For å få satt initialState
            return reducer(state, action);
        }

        if (action.name !== name) {
            return state;
        }
        return reducer(state, action);
    };
}

export interface AppState {
    ui: {
        listevisningMinOversikt: ListevisningState;
        listevisningEnhetensOversikt: ListevisningState;
        sidebarMinOversikt: any;
        sidebarEnhetensOversikt: any;
    };
    valgtEnhet: ValgtEnhetState;
    portefolje: PortefoljeState;
    paginering: any;
    sortering: any;
    veiledere: VeiledereState;
    portefoljestorrelser: PortefoljeStorrelser;
    statustallVeileder: StatustallVeilederState;
    statustallEnhet: StatustallEnhetState;
    filtreringEnhetensOversikt: FiltervalgModell;
    filtreringMinoversikt: FiltervalgModell;
    filtreringVeilederoversikt: FiltervalgModell;
    modal: any;
    serverfeilModal: any;
    feilmeldingModal: any;
    arbeidsliste: any;
    huskelapp: any;
    enhettiltak: EnhettiltakState;
    features: FeaturesState;
    veiledergrupper: LagretFilterState;
    mineFilter: LagretFilterState;
    mineFilterMinOversikt: LagretFilterUIState;
    mineFilterEnhetensOversikt: LagretFilterUIState;
    mineFilterVeilederOversikt: LagretFilterUIState;
    toastReducer: ToastState;
    innloggetVeileder: InnloggetVeilederState;
    systemmeldinger: SystemmeldingState;
    foedelandList: FoedelandListState;
    tolkbehovSpraakList: TolkebehovSpraakListState;
    sesjonStatus: SesjonStatusState;
    brukerfeilStatus: BrukerfeilState;
    geografiskBosted: GeografiskBostedListState;
    brukerIKontekst: BrukerIKontekstState;
}

export default combineReducers<AppState>({
    ui: combineReducers({
        listevisningMinOversikt: persistentReducer(
            'minOversiktListevisningState',
            window.location,
            named(OversiktType.minOversikt, listevisningReducer),
            initialStateMinOversikt
        ),
        listevisningEnhetensOversikt: persistentReducer(
            'enhetensOversiktListevisningState',
            window.location,
            named(OversiktType.enhetensOversikt, listevisningReducer),
            initialStateEnhetensOversikt
        ),
        sidebarMinOversikt: persistentReducer(
            'minOversiktSidebar',
            window.location,
            named(OversiktType.minOversikt, sidebarReducer),
            initialStateSidebar
        ),
        sidebarEnhetensOversikt: persistentReducer(
            'enhetensOversiktSidebar',
            window.location,
            named(OversiktType.enhetensOversikt, sidebarReducer),
            initialStateSidebar
        )
    }),
    valgtEnhet: valgtEnhetReducer,
    portefolje: portefoljeReducer,
    paginering: pagineringReducer,
    sortering: sorteringReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    statustallVeileder: statustallVeilederReducer,
    statustallEnhet: statustallEnhetReducer,
    filtreringEnhetensOversikt: persistentReducer(
        'enhetsState',
        window.location,
        named(OversiktType.enhetensOversikt, filtreringReducer),
        initialState
    ),
    filtreringMinoversikt: persistentReducer(
        'veilederState',
        window.location,
        named(OversiktType.minOversikt, filtreringReducer),
        initialState
    ),
    filtreringVeilederoversikt: named(OversiktType.veilederOversikt, filtreringReducer),
    modal: modalReducer,
    serverfeilModal: serverfeilModalReducer,
    feilmeldingModal: feilmedlingModalReducer,
    arbeidsliste: arbeidslisteReducer,
    huskelapp: huskelappReducer,
    enhettiltak: enhetTiltakReducer,
    features: featuresReducer,
    veiledergrupper: veiledergrupperLagretFilterReducer,
    mineFilter: mineFilterReducer,
    mineFilterMinOversikt: named(OversiktType.minOversikt, lagretFilterUIState),
    mineFilterEnhetensOversikt: named(OversiktType.enhetensOversikt, lagretFilterUIState),
    mineFilterVeilederOversikt: named(OversiktType.veilederOversikt, lagretFilterUIState),
    toastReducer: toastReducer,
    innloggetVeileder: innloggetVeilederReducer,
    systemmeldinger: systemmeldingerReducer,
    geografiskBosted: geografiskbostedListReducer,
    foedelandList: foedelandListReducer,
    tolkbehovSpraakList: tolkebehovListReducer,
    sesjonStatus: informasjonsmeldingReducer,
    brukerfeilStatus: brukerfeilReducer,
    brukerIKontekst: brukerIKontekstReducer
});
