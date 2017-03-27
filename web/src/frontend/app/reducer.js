import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import enheterReducer from './ducks/enheter';
import ledeteksterReducer from './ducks/ledetekster';
import portefoljeReducer from './ducks/portefolje';
import veiledereReducer from './ducks/veiledere';
import portefoljestorrelserReducer from './ducks/portefoljestorrelser';
import pagineringReducer from './ducks/paginering';
import filtreringReducer from './ducks/filtrering';
import filtreringMellomlagringReducer from './ducks/filtrering-mellomlagring';
import statustallReducer from './ducks/statustall';
import dropdownReducer from './components/dropdown/dropdown-reducer';

export default combineReducers({
    enheter: enheterReducer,
    ledetekster: ledeteksterReducer,
    portefolje: portefoljeReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    paginering: pagineringReducer,
    statustall: statustallReducer,
    filtrering: filtreringReducer,
    filtreringMellomlagring: filtreringMellomlagringReducer,
    form: formReducer,
    ui: combineReducers({
        dropdown: dropdownReducer
    })
});
