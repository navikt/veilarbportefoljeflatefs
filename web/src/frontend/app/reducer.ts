import { combineReducers } from 'redux';
import { reducer as formReducer } from 'react-redux-form-validation';
import persistent from './utils/persistentReducer';
import enheterReducer, { EnheterState } from './ducks/enheter';
import ledeteksterReducer from './ducks/ledetekster';
import portefoljeReducer, { PortefoljeState } from './ducks/portefolje';
import pagineringReducer from './ducks/paginering';
import sorteringReducer from './ducks/sortering';
import veiledereReducer, { VeiledereState } from './ducks/veiledere';
import portefoljestorrelserReducer from './ducks/portefoljestorrelser';
import veilederpagineringReducer from './ducks/veilederpaginering';
import filtreringReducer, { FiltreringState, initialState } from './ducks/filtrering';
import statustallReducer from './ducks/statustall';
import modalReducer from './ducks/modal';
import serverfeilModalReducer from './ducks/modal-serverfeil';
import feilmedlingModalReducer from './ducks/modal-feilmelding-brukere';
import diagramReducer from './ducks/diagram';
import sideReducer from './ducks/ui/side';
import { slettCleanIUrl } from './utils/utils';
import arbeidslisteReducer from './ducks/arbeidsliste';
import enhetTiltakReducer, { EnhettiltakState } from './ducks/enhettiltak';
import listevisningReducer, {
    ListevisningState,
    initialStateMinOversikt,
    initialStateEnhetensOversikt,
    ListevisningType
} from './ducks/ui/listevisning';
import { featureToggleReducer, FeatureToggleState, initialState as featureInitialState } from './components/feature-toggle/feature-toggle-reducer';
import {default as contextReducer, ContextState } from './components/enhet-context/context-reducer';

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
    ledetekster: any;
    portefolje: PortefoljeState;
    paginering: any;
    sortering: any;
    veiledere: VeiledereState;
    portefoljestorrelser: any;
    veilederpaginering: any;
    statustall: any;
    filtrering: FiltreringState;
    filtreringMinoversikt: any;
    filtreringVeilederoversikt: any;
    modal: any;
    serverfeilModal: any;
    feilmeldingModal: any;
    diagram: any;
    arbeidsliste: any;
    enhettiltak: EnhettiltakState;
    nycontext: ContextState;
    features: FeatureToggleState;
    form: any;
}

export default combineReducers<AppState>({
    ui: combineReducers({
        side: sideReducer,
        listevisningMinOversikt: persistent('minOversiktListevisningState', location, named(ListevisningType.minOversikt, listevisningReducer), slettCleanIUrl, initialStateMinOversikt),
        listevisningEnhetensOversikt: persistent('enhetensOversiktListevisningState', location, named(ListevisningType.enhetensOversikt, listevisningReducer), slettCleanIUrl, initialStateEnhetensOversikt)
    }),
    enheter: enheterReducer,
    ledetekster: ledeteksterReducer,
    portefolje: portefoljeReducer,
    paginering: pagineringReducer,
    sortering: sorteringReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    veilederpaginering: veilederpagineringReducer,
    statustall: statustallReducer,
    filtrering: persistent('enhetsState', location, named('enhet', filtreringReducer), slettCleanIUrl, initialState),
    filtreringMinoversikt: persistent('veilederState', location,
        named('veileder', filtreringReducer), slettCleanIUrl, initialState),
    filtreringVeilederoversikt: named('veiledere', filtreringReducer),
    modal: modalReducer,
    serverfeilModal: serverfeilModalReducer,
    feilmeldingModal: feilmedlingModalReducer,
    diagram: diagramReducer,
    arbeidsliste: arbeidslisteReducer,
    nycontext: contextReducer,
    enhettiltak: enhetTiltakReducer,
    features: persistent('featureToggles', location, featureToggleReducer, slettCleanIUrl, featureInitialState),
    form: formReducer
});
