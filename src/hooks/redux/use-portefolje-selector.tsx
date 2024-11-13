import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {getFiltreringState, selectValgteKolonner} from '../../ducks/ui/listevisning-selectors';
import {ValgteKolonnerState, OversiktType} from '../../ducks/ui/listevisning';
import {createSelector} from 'reselect';
import {BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {PortefoljeState} from '../../ducks/portefolje';
import {EnhettiltakState} from '../../ducks/enhettiltak';

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
    (state, listevisningType) => getFiltreringState(state, listevisningType),
    (state, listevisningType) => selectValgteKolonner(state, listevisningType),
    selectSorteringsFeldt,
    (enhettiltak, portefolje, enhetId, sorteringsrekkefolge, brukere, filtervalg, valgteKolonner, sorteringsfelt) => ({
        enhettiltak,
        portefolje,
        enhetId,
        sorteringsrekkefolge,
        brukere,
        filtervalg,
        valgteKolonner,
        sorteringsfelt
    })
);

interface UsePortefoljeSelector {
    enhettiltak: EnhettiltakState;
    portefolje: PortefoljeState;
    enhetId: OrNothing<string>;
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    brukere: BrukerModell[];
    filtervalg: FiltervalgModell;
    valgteKolonner: ValgteKolonnerState;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
}

export function usePortefoljeSelector(listevisningType: OversiktType): UsePortefoljeSelector {
    return useSelector((state: AppState) => selectPortefoljeTabell(state, listevisningType));
}
