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
import veiledergrupperLagretFilterReducer, {VeiledergrupperLagretFilterState} from './ducks/veiledergrupper_action-reducers';
import lagretFilterReducer, {LagretFilterState} from './ducks/lagret-filter_action-reducers';
import arbeidslisteReducer from './ducks/arbeidsliste';
import enhetTiltakReducer, {EnhettiltakState} from './ducks/enhettiltak';
import listevisningReducer, {
    initialStateEnhetensOversikt,
    initialStateMinOversikt,
    ListevisningState,
    ListevisningType
} from './ducks/ui/listevisning';
import featuresReducer, {FeaturesState} from './ducks/features';
import toastReducer, {ToastState} from './store/toast/reducer';
import {FiltervalgModell} from "./model-interfaces";
import inloggetVeilederReducer, {InloggetVeilederState} from "./ducks/inlogget-veileder";


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
    };
    valgtEnhet: ValgtEnhetState;
    portefolje: PortefoljeState;
    paginering: any;
    sortering: any;
    veiledere: VeiledereState;
    portefoljestorrelser: PortefoljeStorrelser;
    statustall: StatustallState;
    filtrering: FiltervalgModell;
    filtreringMinoversikt: FiltervalgModell;
    filtreringVeilederoversikt: FiltervalgModell;
    modal: any;
    serverfeilModal: any;
    feilmeldingModal: any;
    arbeidsliste: any;
    enhettiltak: EnhettiltakState;
    features: FeaturesState;
    veiledergrupperLagretFilter: VeiledergrupperLagretFilterState;
    lagretFilter: LagretFilterState;
    toastReducer: ToastState;
    inloggetVeileder: InloggetVeilederState;
}

export default combineReducers<AppState>({
    ui: combineReducers({
        listevisningMinOversikt: persistent('minOversiktListevisningState', window.location, named(ListevisningType.minOversikt, listevisningReducer), initialStateMinOversikt),
        listevisningEnhetensOversikt: persistent('enhetensOversiktListevisningState', window.location, named(ListevisningType.enhetensOversikt, listevisningReducer), initialStateEnhetensOversikt)
    }),
    valgtEnhet: valgtEnhetReducer,
    portefolje: portefoljeReducer,
    paginering: pagineringReducer,
    sortering: sorteringReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    statustall: statustallReducer,
    filtrering: persistent('enhetsState', window.location, named('enhet', filtreringReducer), initialState),
    filtreringMinoversikt: persistent('veilederState', window.location,
        named('veileder', filtreringReducer), initialState),
    filtreringVeilederoversikt: named('veiledere', filtreringReducer),
    modal: modalReducer,
    serverfeilModal: serverfeilModalReducer,
    feilmeldingModal: feilmedlingModalReducer,
    arbeidsliste: arbeidslisteReducer,
    enhettiltak: enhetTiltakReducer,
    features: featuresReducer,
    veiledergrupperLagretFilter: veiledergrupperLagretFilterReducer,
    lagretFilter: lagretFilterReducer,
    toastReducer: toastReducer,
    inloggetVeileder: inloggetVeilederReducer
});
