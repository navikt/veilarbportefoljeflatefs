import {Action, Reducer} from 'redux';
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

/**
 * Leser data fra LocalStorage for et gitt scope.
 *
 * @param scope - Scope det skal leses fra.
 */
function read(scope: LocalStorageScope) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

/**
 * Skriver data til LocalStorage for et gitt scope.
 *
 * @param scope - Scope det skal skrives til.
 * @param content - Data som skal skrives.
 */
function write(scope: LocalStorageScope, content: any) {
    return localStorage.setItem(scope, JSON.stringify(content));
}

function erFiltreringEndret(scope: LocalStorageScope, initialState: any) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return true;
    }

    const stored = JSON.parse(content);
    const keysFromStorage = Object.keys(stored);
    const keysFromInitialState = Object.keys(initialState);

    if (keysFromStorage.length !== keysFromInitialState.length) {
        return true;
    }

    if (!keysFromStorage.every(key => keysFromInitialState.includes(key))) {
        return true;
    }

    // Sjekk at typene stemmer overens
    for (const key of keysFromInitialState) {
        const expected = initialState[key];
        const actual = stored[key];

        if (Array.isArray(expected)) {
            if (!Array.isArray(actual)) return true;
        } else if (expected === null) {
            if (actual !== null && actual !== undefined && typeof actual !== 'string') {
                return true;
            }
        } else if (typeof expected !== typeof actual) {
            return true;
        }
    }

    return false;
}

/**
 * Funksjon som forsøker å holde state for en gitt state-slice (gitt ved `reducer`-parameteret) i sync med LocalStorage.
 * Dersom `state` (fra `reducer`-funksjonen) er `undefined`, vil den forsøke å lese fra LocalStorage. Dersom state endres
 * (dvs. `reducer` returnerer en ny state), vil den forsøke å skrive dette til LocalStorage. Dersom `location.search`
 * inneholder `clean` eller filtrering er endret, vil LocalStorage bli satt til `undefined`.
 *
 * @param scope - Scope det skal leses og skrives til i LocalStorage.
 * @param location - URL-objektet som brukes for å sjekke om `clean` finnes i querystring.
 * @param reducer - Reducer-funksjonen som skal brukes.
 * @param initialFilterstate - Initial state for filtrering.
 */
export function persistentReducer<S, A extends Action>(
    scope: LocalStorageScope,
    location: Location,
    reducer: (state: S | undefined, action: A & {name: OversiktType}) => S,
    initialFilterstate: S
): Reducer<S, A & {name: OversiktType}> {
    return (state: S | undefined, action: A & {name: OversiktType}): S => {
        let eksisterendeState = state;

        if (location.search.includes('clean') || erFiltreringEndret(scope, initialFilterstate)) {
            write(scope, undefined);
        }

        if (state === undefined) {
            eksisterendeState = read(scope);
        }

        const stateResultatFraReducer = reducer(eksisterendeState, action);

        if (stateResultatFraReducer !== eksisterendeState) {
            write(scope, stateResultatFraReducer);
        }

        return stateResultatFraReducer;
    };
}
