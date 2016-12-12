import { combineReducers } from 'redux';
import enheterReducer from './ducks/enheter';

export default combineReducers({
    enheter: enheterReducer
});
