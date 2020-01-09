import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { getFiltertingState, selectValgteAlternativer } from "../../ducks/ui/listevisning-selectors";
import {Kolonne, ListevisningType} from "../../ducks/ui/listevisning";
import { createSelector } from 'reselect'
import {BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge} from "../../model-interfaces";
import {OrNothing} from "../../utils/types/types";

const selectValgtEnhetId = (state: AppState) => state.valgtEnhet.data.enhetId;
const selectSorteringsrekkefolge = (state: AppState) => state.portefolje.sorteringsrekkefolge;
const selectBrukere = (state: AppState) => state.portefolje.data.brukere;
const selectSorteringsFeldt = (state: AppState) => state.portefolje.sorteringsfelt;


const selectValgteKolonner = (state: AppState, listeVisningstype: ListevisningType) => selectValgteAlternativer(state, listeVisningstype);

const selectPortefoljeTabell = createSelector(
    selectValgtEnhetId,
    selectSorteringsrekkefolge,
    selectBrukere,
    (state, listevisningType) => getFiltertingState(state, listevisningType),
    (state, listevisningType) => selectValgteKolonner(state, listevisningType),
    selectSorteringsFeldt,
    (enhetId, sorteringsrekkefolge, brukere, filtervalg, valgteKolonner, sorteringsfelt) =>
        ({enhetId, sorteringsrekkefolge,brukere, filtervalg, valgteKolonner, sorteringsfelt})
);

interface UsePortefoljeSelector {
    enhetId: OrNothing<string>;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    brukere: BrukerModell[],
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    sorteringsfelt: Sorteringsfelt;
}

export function usePortefoljeSelector(listevisningType: ListevisningType): UsePortefoljeSelector {
    return useSelector((state: AppState) =>  selectPortefoljeTabell(state,listevisningType));
}
