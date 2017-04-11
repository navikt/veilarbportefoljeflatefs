import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import DevTools from './devtools';
import reducer from './reducer';
import { erDev } from './utils/utils';


function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);// eslint-disable-line no-undef
    return (matches && matches.length > 0) ? matches[1] : null;
}

function getDevStoreCompose(history) {
    /* eslint-disable no-underscore-dangle */
    const useExtension = window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined;
    const composer = useExtension ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    return composer(
        applyMiddleware(thunkMiddleware, routerMiddleware(history)),
        useExtension ? c => c : DevTools.instrument(),
        persistState(getDebugSessionKey())
    );
}

function getStoreCompose(history) {
    return compose(
        applyMiddleware(thunkMiddleware, routerMiddleware(history))
    );
}

export default function create(history) {
    const composed = erDev() ? getDevStoreCompose(history) : getStoreCompose(history);

    return composed(createStore)(reducer, {});
}
