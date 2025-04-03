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
export function persistentReducer(
    scope: LocalStorageScope,
    location: Location,
    reducer: (state: any, action: Action & {name: OversiktType}) => any,
    initialFilterstate: any
) {
    return (state: any, action: Action & {name: OversiktType}) => {
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
