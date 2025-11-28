// Actions
export const SORTERT_PA = 'veilarbportefoljeflatefs/sortering/SORTERT_PA';
export const RESET = 'veilarbportefoljeflatefs/sortering/SETUP';

export enum SorteringsrekkefolgeVeilederoversikt {
    STIGENDE = 'ascending',
    SYNKENDE = 'decending',
    NA = 'none'
}

export interface VeilederoversiktSortering {
    property: 'etternavn' | 'portefoljestorrelse';
    direction: SorteringsrekkefolgeVeilederoversikt;
}

const initialState: VeilederoversiktSortering = {
    property: 'etternavn',
    direction: SorteringsrekkefolgeVeilederoversikt.STIGENDE
};

// Reducer
export function sorteringReducer(state = initialState, action) {
    switch (action.type) {
        case SORTERT_PA: {
            const {property} = action.data;

            let direction = SorteringsrekkefolgeVeilederoversikt.STIGENDE;
            if (property === state.property) {
                direction =
                    state.direction === SorteringsrekkefolgeVeilederoversikt.SYNKENDE
                        ? SorteringsrekkefolgeVeilederoversikt.STIGENDE
                        : SorteringsrekkefolgeVeilederoversikt.SYNKENDE;
            }

            return {property, direction};
        }
        case RESET:
            return {...initialState};
        default:
            return state;
    }
}

// Action Creators
export function sortBy(property) {
    return {type: SORTERT_PA, data: {property}};
}

export function resetSort() {
    return {type: RESET};
}
