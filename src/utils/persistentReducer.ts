import {Action, Reducer} from 'redux';
import {OversiktType} from '../ducks/ui/valgte-kolonner';
import {filtervalgValidators} from '../components/modal/mine-filter/mine-filter-validering-filtermodel-utils';
import {Filtervalg} from '../typer/filtervalg-modell';

/**
 * Et scope er en unik nøkkel som brukes for å lagre state i LocalStorage.
 *
 * Eksempel: localStorage.getItem('minOversiktValgteKolonnerState').
 */
export enum LocalStorageScope {
    MIN_OVERSIKT_VALGTE_KOLONNER_STATE = 'minOversiktListevisningState',
    ENHETENS_OVERSIKT_VALGTE_KOLONNER_STATE = 'enhetensOversiktListevisningState',
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
export function persistentReducer<S extends Record<string, unknown>, A extends Action>(
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

function erFiltreringEndret(scope: LocalStorageScope, initialState: Record<string, unknown>): boolean {
    const stored = lesLagretState(scope);
    if (!stored) return true;

    if (!harSammeNokler(stored, initialState)) return true;

    const typerStemmer = Object.keys(initialState).every(key => harSammeType(initialState[key], stored[key]));
    if (!typerStemmer) return true;

    if (erFiltervalgScope(scope) && !harGyldigeFiltervalgVerdier(stored)) return true;

    return false;
}

function harSammeNokler(a: object, b: object): boolean {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(k => bKeys.includes(k));
}

function harSammeType(expected: unknown, actual: unknown): boolean {
    if (Array.isArray(expected)) {
        return Array.isArray(actual);
    }
    if (expected === null) {
        return actual === null || actual === undefined || typeof actual === 'string';
    }
    return typeof expected === typeof actual;
}

function erFiltervalgScope(scope: LocalStorageScope): boolean {
    return scope === LocalStorageScope.ENHETS_STATE || scope === LocalStorageScope.VEILEDER_STATE;
}

function harGyldigeFiltervalgVerdier(stored: Record<string, unknown>): boolean {
    return Object.entries(stored).every(([key, verdi]) => {
        const validator = filtervalgValidators[key as Filtervalg];
        if (!validator) return true;
        return validator(verdi) !== undefined;
    });
}

function lesLagretState(scope: LocalStorageScope): Record<string, unknown> | undefined {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') return undefined;
    try {
        return JSON.parse(content);
    } catch {
        return undefined;
    }
}
