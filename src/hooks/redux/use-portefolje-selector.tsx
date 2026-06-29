import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {createSelector} from 'reselect';
import {
    getFiltreringState,
    skalViseFargekategoriKolonne,
    selectValgteKolonner
} from '../../ducks/ui/valgte-kolonner-selectors';
import {ValgteKolonnerState, OversiktType} from '../../ducks/ui/valgte-kolonner';
import {BrukerModell} from '../../typer/bruker-modell';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {OrNothing} from '../../utils/types/types';
import {PortefoljeState} from '../../ducks/portefolje';
import {EnhettiltakState} from '../../ducks/enhettiltak';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../typer/kolonnesortering';
import {INGEN_KATEGORI} from '../../filtrering/filter-konstanter';

const selectValgtEnhetId = (state: AppState) => state.valgtEnhet.data.enhetId;
const selectPortefolje = (state: AppState) => state.portefolje;
const selectEnhetTiltak = (state: AppState) => state.enhettiltak;
const selectFiltervalgForValgteKolonner = (state: AppState, valgteKolonnerType: OversiktType): FiltervalgModell =>
    getFiltreringState(state, valgteKolonnerType);
const selectValgteKolonnerForType = (state: AppState, valgteKolonnerType: OversiktType): ValgteKolonnerState =>
    selectValgteKolonner(state, valgteKolonnerType);

function filtrerBrukerePaValgtFargekategori(
    brukere: BrukerModell[],
    filtervalg: FiltervalgModell,
    oversiktType: OversiktType
): BrukerModell[] {
    const valgteFargekategorier = filtervalg.fargekategorier;

    if (!skalViseFargekategoriKolonne(filtervalg, oversiktType)) {
        return brukere;
    }

    return brukere.filter(bruker => {
        if (bruker.fargekategori === null) {
            return valgteFargekategorier.includes(INGEN_KATEGORI);
        }

        return valgteFargekategorier.includes(bruker.fargekategori);
    });
}

const selectPortefoljeTabell = createSelector(
    selectEnhetTiltak,
    selectPortefolje,
    selectValgtEnhetId,
    selectFiltervalgForValgteKolonner,
    selectValgteKolonnerForType,
    (enhettiltak, portefolje, enhetId, filtervalg, valgteKolonner) => ({
        enhettiltak,
        portefolje,
        enhetId,
        sorteringsrekkefolge: portefolje.sorteringsrekkefolge,
        brukere: portefolje.data.brukere,
        filtervalg,
        valgteKolonner,
        sorteringsfelt: portefolje.sorteringsfelt
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

export function usePortefoljeSelector(valgteKolonnerType: OversiktType): UsePortefoljeSelector {
    return useSelector((state: AppState) => {
        const result = selectPortefoljeTabell(state, valgteKolonnerType);

        return {
            ...result,
            brukere: filtrerBrukerePaValgtFargekategori(result.brukere, result.filtervalg, valgteKolonnerType)
        };
    });
}
