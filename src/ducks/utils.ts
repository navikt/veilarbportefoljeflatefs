import {OversiktType} from './ui/listevisning';
import {logEvent} from '../utils/frontend-logger';

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
        if (!window.location.href.toString().includes('401.html')) {
            const urlUtenFnr = response?.url?.replace(/\d{11}/, '');
            logEvent('portefolje.logger.innlogging', {
                url: urlUtenFnr
            });
            window.location.href = '/401.html';
        }
    }
    return Promise.reject(new FetchError(response.statusText, response));
}

export function toJson(response) {
    if (response.status !== 204) {
        // No content
        return response.json();
    }
    return response;
}

export function sendResultatTilDispatch(dispatch, action) {
    return (...data) => {
        if (data.length === 1) {
            return dispatch({type: action, data: data[0]});
        }
        return dispatch({type: action, data});
    };
}

export function handterFeil(dispatch, action) {
    return error => {
        if (error.response) {
            error.response.text().then(data => {
                // eslint-disable-next-line no-console
                console.error(error, error.stack, data);
                dispatch({type: action, data: {response: error.response, data}});
            });
        } else {
            // eslint-disable-next-line no-console
            console.error(error, error.stack);
            dispatch({type: action, data: error.toString()});
        }
    };
}

export function fetchToJson(url: string, config: RequestInit = {}) {
    return fetch(url, config).then(sjekkStatuskode).then(toJson);
}

export function doThenDispatch(fn, {OK, FEILET, PENDING}) {
    return (dispatch, getState?) => {
        if (PENDING) {
            dispatch({type: PENDING});
        }
        return fn(dispatch, getState)
            .then(data => sendResultatTilDispatch(dispatch, OK)(data))
            .catch(handterFeil(dispatch, FEILET));
    };
}

export const stateSliceToNameMap = {
    filtreringEnhetensOversikt: OversiktType.enhetensOversikt,
    filtreringMinoversikt: OversiktType.minOversikt,
    filtreringVeilederoversikt: OversiktType.veilederOversikt
};

export const nameToStateSliceMap = Object.entries(stateSliceToNameMap)
    .map(([a, b]) => [b, a])
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
