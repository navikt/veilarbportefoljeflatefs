import {combineReducers} from 'redux';
import persistent from './utils/persistentReducer';
import valgtEnhetReducer, {ValgtEnhetState} from './ducks/valgt-enhet';
import portefoljeReducer, {PortefoljeState} from './ducks/portefolje';
import pagineringReducer from './ducks/paginering';
import sorteringReducer from './ducks/sortering';
import veiledereReducer, {VeiledereState} from './ducks/veiledere';
import portefoljestorrelserReducer, {PortefoljeStorrelser} from './ducks/portefoljestorrelser';
import filtreringReducer, {initialState} from './ducks/filtrering';
import statustallReducer, {StatustallState} from './ducks/statustall';
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
    statustall: StatustallState;
    filtreringEnhetensOversikt: FiltervalgModell;
    filtreringMinoversikt: FiltervalgModell;
    filtreringVeilederoversikt: FiltervalgModell;
    modal: any;
    serverfeilModal: any;
    feilmeldingModal: any;
    arbeidsliste: any;
    enhettiltak: EnhettiltakState;
    features: FeaturesState;
    veiledergrupper: LagretFilterState;
    mineFilter: LagretFilterState;
    mineFilterMinOversikt: LagretFilterUIState;
    mineFilterEnhetensOversikt: LagretFilterUIState;
    mineFilterVeilederOversikt: LagretFilterUIState;
    toastReducer: ToastState;
    innloggetVeileder: InnloggetVeilederState;
}

export default combineReducers<AppState>({
    ui: combineReducers({
        listevisningMinOversikt: persistent(
            'minOversiktListevisningState',
            window.location,
            named(OversiktType.minOversikt, listevisningReducer),
            initialStateMinOversikt
        ),
        listevisningEnhetensOversikt: persistent(
            'enhetensOversiktListevisningState',
            window.location,
            named(OversiktType.enhetensOversikt, listevisningReducer),
            initialStateEnhetensOversikt
        ),
        sidebarMinOversikt: persistent(
            'minOversiktSidebar',
            window.location,
            named(OversiktType.minOversikt, sidebarReducer),
            initialStateSidebar
        ),
        sidebarEnhetensOversikt: persistent(
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
    statustall: statustallReducer,
    filtreringEnhetensOversikt: persistent(
        'enhetsState',
        window.location,
        named(OversiktType.enhetensOversikt, filtreringReducer),
        initialState
    ),
    filtreringMinoversikt: persistent(
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
    enhettiltak: enhetTiltakReducer,
    features: featuresReducer,
    veiledergrupper: veiledergrupperLagretFilterReducer,
    mineFilter: mineFilterReducer,
    mineFilterMinOversikt: named(OversiktType.minOversikt, lagretFilterUIState),
    mineFilterEnhetensOversikt: named(OversiktType.enhetensOversikt, lagretFilterUIState),
    mineFilterVeilederOversikt: named(OversiktType.veilederOversikt, lagretFilterUIState),
    toastReducer: toastReducer,
    innloggetVeileder: innloggetVeilederReducer
});
