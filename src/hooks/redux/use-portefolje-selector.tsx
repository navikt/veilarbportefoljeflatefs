import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {createSelector} from 'reselect';
import {getFiltreringState, selectListeVisning} from '../../ducks/ui/listevisning-selectors';
import {ListevisningState, OversiktType} from '../../ducks/ui/listevisning';
import {BrukerModell} from '../../typer/bruker-modell';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {OrNothing} from '../../utils/types/types';
import {PortefoljeState} from '../../ducks/portefolje';
import {EnhettiltakState} from '../../ducks/enhettiltak';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../typer/kolonnesortering';

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
    (state, listevisningType) => selectListeVisning(state, listevisningType),
    selectSorteringsFeldt,
    (enhettiltak, portefolje, enhetId, sorteringsrekkefolge, brukere, filtervalg, listevisning, sorteringsfelt) => ({
        enhettiltak,
        portefolje,
        enhetId,
        sorteringsrekkefolge,
        brukere,
        filtervalg,
        listevisning,
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
    listevisning: ListevisningState;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
}

export function usePortefoljeSelector(listevisningType: OversiktType): UsePortefoljeSelector {
    return useSelector((state: AppState) => selectPortefoljeTabell(state, listevisningType));
}
