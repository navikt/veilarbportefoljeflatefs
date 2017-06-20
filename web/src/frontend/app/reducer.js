import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import persistent from './utils/persistentReducer';
import enheterReducer from './ducks/enheter';
import ledeteksterReducer from './ducks/ledetekster';
import portefoljeReducer from './ducks/portefolje';
import pagineringReducer from './ducks/paginering';
import sorteringReducer from './ducks/sortering';
import veiledereReducer from './ducks/veiledere';
import portefoljestorrelserReducer from './ducks/portefoljestorrelser';
import veilederpagineringReducer from './ducks/veilederpaginering';
import filtreringReducer, { initialState } from './ducks/filtrering';
import statustallReducer from './ducks/statustall';
import modalReducer from './ducks/modal';
import diagramReducer from './ducks/diagram';
import sideReducer from './ducks/ui/side';
import { slettCleanIUrl } from './utils/utils';

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

export const stateSliceToNameMap = {
    filtrering: 'enhet',
    filtreringMinoversikt: 'veileder',
    filtreringVeilederoversikt: 'veiledere'
};
export const nameToStateSliceMap = Object.entries(stateSliceToNameMap)
    .map(([a, b]) => [b, a])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export default combineReducers({
    ui: combineReducers({
        side: sideReducer
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
    // eslint-disable-next-line no-undef
    filtrering: persistent('enhetsState', location, named('enhet', filtreringReducer), slettCleanIUrl, initialState),
    // eslint-disable-next-line no-undef
    filtreringMinoversikt: persistent('veilederState', location,
        named('veileder', filtreringReducer), slettCleanIUrl, initialState),
    filtreringVeilederoversikt: named('veiledere', filtreringReducer),
    modal: modalReducer,
    diagram: diagramReducer,
    form: formReducer
});
