import { useSelector } from 'react-redux';
import {AppState} from "../../reducer";
import { createSelector } from 'reselect'

const selectSorteringsrekkefolge = (state: AppState) => state.portefolje.sorteringsrekkefolge;
const selectSorteringsfelt = (state: AppState) => state.portefolje.sorteringsfelt;

const selectSortering = createSelector(
    (state: AppState) => selectSorteringsfelt(state),
    (state: AppState) => selectSorteringsrekkefolge(state),
    (sorteringsrekkefolge, sorteringsfelt) => ({sorteringsrekkefolge, sorteringsfelt})
);

export interface PortefoljeStortering {
    sorteringsrekkefolge: string;
    sorteringsfelt: string;
}


export function useSorteringSelector() {
    const sortering: PortefoljeStortering = useSelector<AppState, PortefoljeStortering>((state) =>
        selectSortering(state));
    return sortering;
}
