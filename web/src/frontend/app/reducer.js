import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import persistent from './utils/persistentReducer';
import enheterReducer from './ducks/enheter';
import ledeteksterReducer from './ducks/ledetekster';
import portefoljeReducer from './ducks/portefolje';
import veiledereReducer from './ducks/veiledere';
import portefoljestorrelserReducer from './ducks/portefoljestorrelser';
import pagineringReducer from './ducks/paginering';
import filtreringReducer from './ducks/filtrering';
import statustallReducer from './ducks/statustall';
import modalReducer from './ducks/modal';
import { slettCleanIUrl } from './utils/utils';

export default combineReducers({
    enheter: enheterReducer,
    ledetekster: ledeteksterReducer,
    portefolje: portefoljeReducer,
    veiledere: veiledereReducer,
    portefoljestorrelser: portefoljestorrelserReducer,
    paginering: pagineringReducer,
    statustall: statustallReducer,
    filtrering: persistent('finstadsLokaleLagringsmedium', location, filtreringReducer, slettCleanIUrl),
    modal: modalReducer,
    form: formReducer
});

