// Actions
export const SETT_LISTE = 'paginering/settliste/OK';
export const SETT_SUBLISTE = 'paginering/settsubliste/OK';
export const KLARER = 'paginering/klarer/OK';
export const SETT_FRA_INDEKS_FOR_SUBLISTE = 'paginering/settfraindeksforsubliste/OK';
export const SETT_SORTERINGSREKKEFOLGE = 'paginering/settSorteringsRekkefolge/OK';

// Utils
export function til(fra, antall, totalt) {
    return fra + antall < totalt ? fra + antall : totalt;
}

const initialState = {
    liste: [],
    subListe: [],
    fraIndeksForSubListe: 0,
    sideStorrelse: 20,
    sorteringsRekkefolge: 'ikke_satt',
    visningsmodus: 'tabell'
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
        case SETT_SORTERINGSREKKEFOLGE:
            return {
                ...state,
                sorteringsRekkefolge: action.sorteringsRekkefolge,
                liste: action.sorteringsRekkefolge === 'descending' ?
                    state.liste.sort(action.sorteringsFunksjon).reverse() :
                    state.liste.sort(action.sorteringsFunksjon)
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

export function settSubListeForPaginering(fraIndeks) {
    return {
        type: SETT_SUBLISTE,
        fraIndeks
    };
}

export function settSorteringRekkefolge(sorteringsFunksjon, sorteringsRekkefolge) {
    return {
        type: SETT_SORTERINGSREKKEFOLGE,
        sorteringsFunksjon,
        sorteringsRekkefolge
    };
}
