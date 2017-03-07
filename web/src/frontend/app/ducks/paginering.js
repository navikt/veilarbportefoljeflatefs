// Actions
export const SETT_LISTE = 'paginering/settliste/OK';
export const SETT_SUBLISTE = 'paginering/settsubliste/OK';
export const KLARER = 'paginering/klarer/OK';
export const SETT_FRA_INDEKS_FOR_SUBLISTE = 'paginering/settfraindeksforsubliste/OK';

// Utils
export function til(fra, antall, totalt) {
    return fra + antall < totalt ? fra + antall : totalt;
}

export function compareEtternavn(a, b) {
    const aUpper = a.etternavn.toUpperCase();
    const bUpper = b.etternavn.toUpperCase();
    if (aUpper < bUpper) {
        return -1;
    }
    if (aUpper > bUpper) {
        return 1;
    }
    return 0;
}

const initialState = {
    liste: [],
    subListe: [],
    fraIndeksForSubListe: 0,
    sideStorrelse: 20
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETT_LISTE:
            return { ...state, liste: action.liste.sort(compareEtternavn) };
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
