export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    RELOADING: 'RELOADING',
    ERROR: 'ERROR'
};

class FetchError extends Error {
    public response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

export function sjekkStatuskode(response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    if (response.status === 401) {
        window.location.href = 'feilsider/401.html';// eslint-disable-line no-undef
    }
    return new FetchError(response.statusText, response);
}

export function toJson(response) {
    if (response.status !== 204) { // No content
        return response.json();
    }
    return response;
}

export function sendResultatTilDispatch(dispatch, action) {
    return (...data) => {
        if (data.length === 1) {
            return dispatch({ type: action, data: data[0] });
        }
        return dispatch({ type: action, data });
    };
}

export function handterFeil(dispatch, action) {
    return (error) => {
        if (error.response) {
            error.response.text().then((data) => {
                console.error(error, error.stack, data); // eslint-disable-line no-console
                dispatch({ type: action, data: { response: error.response, data } });
            });
        } else {
            console.error(error, error.stack); // eslint-disable-line no-console
            dispatch({ type: action, data: error.toString() });
        }
    };
}

export function fetchToJson<ResponseInterface>(url: string, config: RequestInit = {}): Promise<ResponseInterface> {
    return fetch(url, config)// eslint-disable-line no-undef
        .then(sjekkStatuskode)
        .then(toJson);
}

export function doThenDispatch(fn, { OK, FEILET, PENDING }) {
    return (dispatch, getState?) => {
        if (PENDING) {
            dispatch({ type: PENDING });
        }
        return fn(dispatch, getState)
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, FEILET));
    };
}

