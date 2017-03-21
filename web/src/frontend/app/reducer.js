import { combineReducers } from 'redux';
import enheterReducer from './ducks/enheter';
import ledeteksterReducer from './ducks/ledetekster';
import portefoljeReducer from './ducks/portefolje';
import veiledereReducer from './ducks/veiledere';
import portefoljestorrelserReducer from './ducks/portefoljestorrelser';
import pagineringReducer from './ducks/paginering';
import filtreringReducer from './ducks/filtrering';
import modalReducer from './ducks/modal';

export default combineReducers({
    enheter: enheterReducer,
    ledetekster: ledeteksterReducer,
    portefolje: portefoljeReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    paginering: pagineringReducer,
    filtrering: filtreringReducer,
    modal: modalReducer
});
