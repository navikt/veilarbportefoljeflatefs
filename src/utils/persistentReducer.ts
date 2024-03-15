import {Action} from 'redux';
import {OversiktType} from '../ducks/ui/listevisning';

/**
 * Et scope er en unik nøkkel som brukes for å lagre state i LocalStorage.
 *
 * Eksempel: localStorage.getItem('minOversiktListevisningState').
 */
export enum LocalStorageScope {
    MIN_OVERSIKT_LISTEVISNING_STATE = 'minOversiktListevisningState',
    ENHETENS_OVERSIKT_LISTEVISNING_STATE = 'enhetensOversiktListevisningState',
    MIN_OVERSIKT_SIDEBAR = 'minOversiktSidebar',
    ENHETENS_OVERSIKT_SIDEBAR = 'enhetensOversiktSidebar',
    ENHETS_STATE = 'enhetsState',
    VEILEDER_STATE = 'veilederState'
}

function read(scope: LocalStorageScope) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope: LocalStorageScope, content: any) {
    return localStorage.setItem(scope, JSON.stringify(content));
}

function erFiltreringEndret(scope: LocalStorageScope, initialState) {
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

export default function persistentReducer(
    scope: LocalStorageScope,
    location: Location,
    reducer: (state: any, action: Action & {name: OversiktType}) => any,
    initialFilterstate: any
) {
    return (state: any, action: Action & {name: OversiktType}) => {
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
}
