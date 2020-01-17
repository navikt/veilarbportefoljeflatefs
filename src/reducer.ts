import { combineReducers } from 'redux';
import persistent from './utils/persistentReducer';
import enheterReducer, { EnheterState } from './ducks/enheter';
import portefoljeReducer, { PortefoljeState } from './ducks/portefolje';
import pagineringReducer from './ducks/paginering';
import sorteringReducer from './ducks/sortering';
import veiledereReducer, { VeiledereState } from './ducks/veiledere';
import portefoljestorrelserReducer, { PortefoljeStorrelser } from './ducks/portefoljestorrelser';
import filtreringReducer, { initialState } from './ducks/filtrering';
import statustallReducer, { StatustallState } from './ducks/statustall';
import statustallInloggetVeilederReducer from './ducks/statustall-innloggetveileder';
import modalReducer from './ducks/modal';
import serverfeilModalReducer from './ducks/modal-serverfeil';
import feilmedlingModalReducer from './ducks/modal-feilmelding-brukere';
import sideReducer from './ducks/ui/side';
import lagretFilterReducer, { LagretFilterState } from './ducks/lagret-filter';
import { slettCleanIUrl } from './utils/url-utils';
import arbeidslisteReducer from './ducks/arbeidsliste';
import enhetTiltakReducer, { EnhettiltakState } from './ducks/enhettiltak';
import listevisningReducer, {
    ListevisningState,
    initialStateMinOversikt,
    initialStateEnhetensOversikt,
    ListevisningType
} from './ducks/ui/listevisning';
import { default as contextReducer, ContextState } from './components/enhet-context/context-reducer';
import featuresReducer, { FeaturesState } from './ducks/features';
import toastReducer, { ToastState } from './store/toast/reducer';
import { FiltervalgModell } from './model-interfaces';

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
        side: any;
        listevisningMinOversikt: ListevisningState;
        listevisningEnhetensOversikt: ListevisningState;
    };
    enheter: EnheterState;
    portefolje: PortefoljeState;
    paginering: any;
    sortering: any;
    veiledere: VeiledereState;
    portefoljestorrelser: PortefoljeStorrelser;
    statustall: StatustallState;
    statustallInloggetVeileder: StatustallState;
    filtrering: FiltervalgModell;
    filtreringMinoversikt: FiltervalgModell;
    filtreringVeilederoversikt: FiltervalgModell;
    modal: any;
    serverfeilModal: any;
    feilmeldingModal: any;
    arbeidsliste: any;
    enhettiltak: EnhettiltakState;
    nycontext: ContextState;
    features: FeaturesState;
    lagretFilter: LagretFilterState;
    toastReducer: ToastState;
}

export default combineReducers<AppState>({
    ui: combineReducers({
        side: sideReducer,
        listevisningMinOversikt: persistent('minOversiktListevisningState', window.location, named(ListevisningType.minOversikt, listevisningReducer), slettCleanIUrl, initialStateMinOversikt),
        listevisningEnhetensOversikt: persistent('enhetensOversiktListevisningState', window.location, named(ListevisningType.enhetensOversikt, listevisningReducer), slettCleanIUrl, initialStateEnhetensOversikt)
    }),
    enheter: enheterReducer,
    portefolje: portefoljeReducer,
    paginering: pagineringReducer,
    sortering: sorteringReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    statustall: statustallReducer,
    statustallInloggetVeileder: statustallInloggetVeilederReducer,
    filtrering: persistent('enhetsState', window.location, named('enhet', filtreringReducer), slettCleanIUrl, initialState),
    filtreringMinoversikt: persistent('veilederState', window.location,
        named('veileder', filtreringReducer), slettCleanIUrl, initialState),
    filtreringVeilederoversikt: named('veiledere', filtreringReducer),
    modal: modalReducer,
    serverfeilModal: serverfeilModalReducer,
    feilmeldingModal: feilmedlingModalReducer,
    arbeidsliste: arbeidslisteReducer,
    nycontext: contextReducer,
    enhettiltak: enhetTiltakReducer,
    features: featuresReducer,
    lagretFilter: lagretFilterReducer,
    toastReducer: toastReducer
});
