function read(scope) {
    const content = localStorage.getItem(scope);// eslint-disable-line no-undef
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope, content) {
    return localStorage.setItem(scope, JSON.stringify(content));// eslint-disable-line no-undef
}

function erFiltreringEndret(scope, initialState) {
    const content = localStorage.getItem(scope);// eslint-disable-line no-undef
    if (!content || content === 'undefined') {
        return true;
    }
    const keysFromStorage = Object.keys(JSON.parse(content));
    const keysFromInitialState = Object.keys(initialState);

    return !(keysFromStorage.length === keysFromInitialState.length &&
        keysFromStorage.every((key) => keysFromInitialState.includes(key)));
}

export default (scope, location, reducer, onClean = () => {}, initialFilterstate) => (state, action) => {
    let nState = state;
    if (location.search.includes('clean') || erFiltreringEndret(scope, initialFilterstate)) {
        write(scope, undefined);
        onClean();
    }
    if (state === undefined) {
        nState = read(scope);
    }

    const rState = reducer(nState, action);

    if (rState !== nState) {
        write(scope, rState);
    }

    return rState;
};
