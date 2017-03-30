// Actions
export const SETT_LISTE = 'veilederpaginering/settliste/OK';
export const SETT_SUBLISTE = 'veilederpaginering/settsubliste/OK';
export const KLARER = 'veilederpaginering/klarer/OK';
export const SETT_FRA_INDEKS_FOR_SUBLISTE = 'veilederpaginering/settfraindeksforsubliste/OK';
export const SETT_NY_SORTERING = 'veilederpaginering/settNySortering/OK';

// Utils
export function til(fra, antall, totalt) {
    return fra + antall < totalt ? fra + antall : totalt;
}

const initialState = {
    liste: [],
    subListe: [],
    fraIndeksForSubListe: 0,
    sideStorrelse: 20,
    currentSortering: {
        felt: 'ikke_satt',
        rekkefolge: 'ikke_satt'
    }
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETT_LISTE:
            return { ...state, liste: action.liste };
        case SETT_SUBLISTE:
            return {
                ...state,
                subListe: state.liste.slice(action.fraIndeks,
                    til(action.fraIndeks, state.sideStorrelse, state.liste.length)),
                fraIndeksForSubListe: action.fraIndeks
            };
        case KLARER:
            return { ...state, liste: [], subListe: [], fraIndeksForSubListe: 0 };
        case SETT_FRA_INDEKS_FOR_SUBLISTE:
            return { ...state, fraIndeksForSubListe: action.fraIndeks };
        case SETT_NY_SORTERING:
            return { ...state, currentSortering: action.nySortering };
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

export function settSubListeForPaginering(fraIndeks) {
    return {
        type: SETT_SUBLISTE,
        fraIndeks
    };
}

export function settNySortering(nySortering) {
    return {
        type: SETT_NY_SORTERING,
        nySortering
    };
}
