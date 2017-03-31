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

export default (scope, location, reducer, onClean = () => {}) => (state, action) => {
    let nState = state;
    if (location.search.includes('clean')) {
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
