import { DEFAULT_PAGINERING_STORRELSE, IKKE_SATT } from '../konstanter';
import { TABELLVISNING } from '../minoversikt/minoversikt-konstanter';
import { sorter } from '../utils/sortering';

// Actions
export const SETT_LISTE = 'veilederpaginering/settliste/OK';
export const SETT_SUBLISTE = 'veilederpaginering/settsubliste/OK';
export const KLARER = 'veilederpaginering/klarer/OK';
export const SETT_FRA_INDEKS_FOR_SUBLISTE = 'veilederpaginering/settfraindeksforsubliste/OK';
export const SETT_NY_SORTERING = 'veilederpaginering/settNySortering/OK';
export const SORTER_PAA_ETTERNAVN = 'veilederpaginering/sorterPaaEtternavn/OK';
export const SORTER_PAA_PORTEFOLJESTORRELSE = 'veilederpaginering/sorterPaaPortefoljestorrelse/OK';
export const SETT_VISNINGSMODUS = 'veilederpaginering/settvisningsmodus/OK';

// Utils
export function sorterPaaEtternavn(veiledere, rekkefolge) {
    return veiledere.sort(sorter('etternavn', rekkefolge));
}

export function sorterPaaPortefoljestorrelse(veiledere, rekkefolge) {
    return veiledere.sort(sorter('portefoljestorrelse', rekkefolge));
}

const initialState = {
    liste: [],
    subListe: [],
    fraIndeksForSubListe: 0,
    sideStorrelse: DEFAULT_PAGINERING_STORRELSE,
    currentSortering: {
        felt: IKKE_SATT,
        rekkefolge: IKKE_SATT
    },
    visningsmodus: TABELLVISNING
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETT_LISTE:
            return { ...state, liste: action.liste };
        case SETT_SUBLISTE:
            return {
                ...state,
                subListe: state.liste.slice(action.fraIndeks, action.fraIndeks + action.antall),
                fraIndeksForSubListe: action.fraIndeks
            };
        case KLARER:
            return { ...state, liste: [], subListe: [], fraIndeksForSubListe: 0 };
        case SETT_FRA_INDEKS_FOR_SUBLISTE:
            return { ...state, fraIndeksForSubListe: action.fraIndeks };
        case SETT_NY_SORTERING:
            return { ...state, currentSortering: action.nySortering };
        case SORTER_PAA_ETTERNAVN:
            return {
                ...state,
                liste: sorterPaaEtternavn(state.liste, action.nySortering.rekkefolge),
                currentSortering: action.nySortering
            };
        case SORTER_PAA_PORTEFOLJESTORRELSE:
            return {
                ...state,
                liste: sorterPaaPortefoljestorrelse(state.liste, action.nySortering.rekkefolge),
                currentSortering: action.nySortering
            };

        case SETT_VISNINGSMODUS:
            return {
                ...state,
                visningsmodus: action.visningsmodus
            };
        default:
            return state;
    }
}

// Action Creators
export function settListeSomSkalPagineres(liste) {
    return {
        type: SETT_LISTE,
        liste
    };
}

export function klarerPagineringsliste() {
    return {
        type: KLARER
    };
}

export function settSubListeForPaginering(fraIndeks, antall) {
    return {
        type: SETT_SUBLISTE,
        fraIndeks,
        antall
    };
}

export function sorterListePaaEtternavn(nySortering) {
    return {
        type: SORTER_PAA_ETTERNAVN,
        nySortering
    };
}

export function sorterListePaaPortefoljestorrelse(nySortering) {
    return {
        type: SORTER_PAA_PORTEFOLJESTORRELSE,
        nySortering
    };
}

export function settVisningsmodus(visningsmodus) {
    return {
        type: SETT_VISNINGSMODUS,
        visningsmodus
    };
}

