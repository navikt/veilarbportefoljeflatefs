import {applyMiddleware, compose, createStore, Store} from 'redux';
import reducer, {AppState} from './reducer';
import {metricsMiddleWare} from './middleware/metrics-middleware';
import {thunk} from 'redux-thunk';

function create() {
    const useExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== undefined;
    const composer = useExtension ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const composed = composer(applyMiddleware(thunk, metricsMiddleWare));

    return composed(createStore)(reducer);
}

let store: Store<AppState>;
export default function getStore(): Store<AppState> {
    if (!store) {
        store = create();
    }
    return store;
}
