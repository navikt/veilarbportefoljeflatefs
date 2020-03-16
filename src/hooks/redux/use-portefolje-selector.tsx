import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { getFiltertingState, selectListeVisning } from "../../ducks/ui/listevisning-selectors";
import { ListevisningState, ListevisningType} from "../../ducks/ui/listevisning";
import { createSelector } from 'reselect'
import {BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge} from "../../model-interfaces";
import {OrNothing} from "../../utils/types/types";
import {PortefoljeState} from "../../ducks/portefolje";
import {EnhettiltakState} from "../../ducks/enhettiltak";

const selectValgtEnhetId = (state: AppState) => state.valgtEnhet.data.enhetId;
const selectSorteringsrekkefolge = (state: AppState) => state.portefolje.sorteringsrekkefolge;
const selectBrukere = (state: AppState) => state.portefolje.data.brukere;
const selectSorteringsFeldt = (state: AppState) => state.portefolje.sorteringsfelt;
const selectPortefolje = (state: AppState) => state.portefolje;
const selectEnhetTiltak = (state: AppState) => state.enhettiltak;


const selectPortefoljeTabell = createSelector(
    selectEnhetTiltak,
    selectPortefolje,
    selectValgtEnhetId,
    selectSorteringsrekkefolge,
    selectBrukere,
    (state, listevisningType) => getFiltertingState(state, listevisningType),
    (state, listevisningType) => selectListeVisning(state, listevisningType),
    selectSorteringsFeldt,
    (enhettiltak, portefolje, enhetId, sorteringsrekkefolge, brukere, filtervalg, listevisning, sorteringsfelt) =>
        ({enhettiltak, portefolje, enhetId, sorteringsrekkefolge,brukere, filtervalg, listevisning, sorteringsfelt})
);

interface UsePortefoljeSelector {
    enhettiltak: EnhettiltakState,
    portefolje: PortefoljeState,
    enhetId: OrNothing<string>;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    brukere: BrukerModell[],
    filtervalg: FiltervalgModell;
    listevisning: ListevisningState;
    sorteringsfelt: Sorteringsfelt;
}

export function usePortefoljeSelector(listevisningType: ListevisningType): UsePortefoljeSelector {
    return useSelector((state: AppState) =>  selectPortefoljeTabell(state,listevisningType));
}
