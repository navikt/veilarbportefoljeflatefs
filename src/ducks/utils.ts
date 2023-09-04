import {OversiktType} from './ui/listevisning';

export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    RELOADING: 'RELOADING',
    ERROR: 'ERROR'
};

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
