function read(scope) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope, content) {
    return localStorage.setItem(scope, JSON.stringify(content));
}

function erFiltreringEndret(scope, initialState) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return true;
    }
    const keysFromStorage = Object.keys(JSON.parse(content));
    const keysFromInitialState = Object.keys(initialState);

    return !(
        keysFromStorage.length === keysFromInitialState.length &&
        keysFromStorage.every(key => keysFromInitialState.includes(key))
    );
}

/* eslint-disable import/no-anonymous-default-export */
export default (scope, location, reducer, initialFilterstate) => (state, action) => {
    let nState = state;
    if (location.search.includes('clean') || erFiltreringEndret(scope, initialFilterstate)) {
        write(scope, undefined);
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
