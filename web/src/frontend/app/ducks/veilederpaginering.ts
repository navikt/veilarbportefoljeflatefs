import { DEFAULT_PAGINERING_STORRELSE } from '../konstanter';
import { TABELLVISNING } from '../minoversikt/minoversikt-konstanter';
import {
    SorteringfeltVeilederOversikt, Sorteringsrekkefolge, VeilederModell,
    VisningType
} from '../model-interfaces';

// Actions
const SETT_LISTE = 'veilederpaginering/settliste/OK';
const SETT_SUBLISTE = 'veilederpaginering/settsubliste/OK';
const KLARER = 'veilederpaginering/klarer/OK';
const SETT_VISNINGSMODUS = 'veilederpaginering/settvisningsmodus/OK';

export interface CurrentSorteringState {
    felt: SorteringfeltVeilederOversikt;
    rekkefolge: Sorteringsrekkefolge;
}

export interface VeilederpagineringState {
    liste: VeilederModell[];
    subListe: VeilederModell[];
    fraIndeksForSubListe: number;
    sideStorrelse: number;
    currentSortering: CurrentSorteringState
    visningsmodus: VisningType
}

const initialState: VeilederpagineringState = {
    liste: [],
    subListe: [],
    fraIndeksForSubListe: 0,
    sideStorrelse: DEFAULT_PAGINERING_STORRELSE,
    currentSortering: {
        felt: SorteringfeltVeilederOversikt.IKKE_SATT,
        rekkefolge: Sorteringsrekkefolge.ikke_satt
    },
    visningsmodus: VisningType.TABELLVISNING
};

//  Reducer
export default function reducer(state = initialState, action): VeilederpagineringState {
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

export function settVisningsmodus(visningsmodus) {
    return {
        type: SETT_VISNINGSMODUS,
        visningsmodus
    };
}
