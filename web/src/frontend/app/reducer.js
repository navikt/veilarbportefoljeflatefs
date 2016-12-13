import { combineReducers } from 'redux';
import enheterReducer from './ducks/enheter';
import ledeteksterReducer from './ducks/ledetekster';

export default combineReducers({
    enheter: enheterReducer,
    ledetekster: ledeteksterReducer
});
