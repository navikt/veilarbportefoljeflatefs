import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import {selectValgteAlternativer} from "../../ducks/ui/listevisning-selectors";
import {Kolonne, ListevisningType} from "../../ducks/ui/listevisning";
import { createSelector } from 'reselect'
import {BrukerModell, Sorteringsfelt, Sorteringsrekkefolge} from "../../model-interfaces";
import {FiltreringState} from "../../ducks/filtrering";

const selectValgtEnhetId = (state: AppState): string => state.enheter.valgtEnhet.enhet!.enhetId;
const selectSorteringsrekkefolge = (state: AppState) => state.portefolje.sorteringsrekkefolge;
const selectBrukere = (state: AppState) => state.portefolje.data.brukere;
const selectSorteringsFeldt = (state: AppState) => state.portefolje.sorteringsfelt;
const selectFiltervalg = (state: AppState) => state.filtrering;
const selectValgteKolonner = (state: AppState) => selectValgteAlternativer(state, ListevisningType.enhetensOversikt);

const selectEnhetsPortefoljeTabell = createSelector(
    selectValgtEnhetId,
    selectSorteringsrekkefolge,
    selectBrukere,
    selectFiltervalg,
    selectValgteKolonner,
    selectSorteringsFeldt,
    (valgtEnhet, sorteringsrekkefolge, brukere, filtervalg, valgteKolonner, sorteringsfelt) =>
        ({valgtEnhet, sorteringsrekkefolge,brukere, filtervalg, valgteKolonner, sorteringsfelt})
);

interface UseEnhetsportefoljeSelector {
    valgtEnhet: string;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    brukere: BrukerModell[],
    filtervalg: FiltreringState;
    valgteKolonner: Kolonne[];
    sorteringsfelt: Sorteringsfelt;
}

export function useEnhetsPortefoljeSelector(): UseEnhetsportefoljeSelector {
    return useSelector(selectEnhetsPortefoljeTabell);
}
