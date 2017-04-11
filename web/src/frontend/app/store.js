import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';

export default function create(history) {
    /* eslint-disable no-underscore-dangle */
    const useExtension = window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined;
    const composer = useExtension ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const composed = composer(
        applyMiddleware(thunkMiddleware, routerMiddleware(history))
    );

    return composed(createStore)(reducer, {});
}
