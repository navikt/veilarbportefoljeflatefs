// Actions
export const SETT_LISTE = 'paginering/settliste/OK';
export const SETT_SUBLISTE = 'paginering/settsubliste/OK';
export const KLARER = 'paginering/klarer/OK';
export const SETT_FRA_INDEKS_FOR_SUBLISTE = 'paginering/settfraindeksforsubliste/OK';

// Utils
function til(fra, antall, totalt) {
    return fra + antall < totalt ? fra + antall : totalt;
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
            return { ...state, liste: action.liste };
        case SETT_SUBLISTE:
            return {
                ...state,
                subListe: state.liste.slice(action.fra, til(action.fra, action.antall, state.liste.length))
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

export function settSubListeForPaginering(fra, antall) {
    return {
        type: SETT_SUBLISTE,
        fra,
        antall
    };
}

export function settFraIndeksForSubListe(fraIndeks) {
    return {
        type: SETT_FRA_INDEKS_FOR_SUBLISTE,
        fraIndeks
    };
}
