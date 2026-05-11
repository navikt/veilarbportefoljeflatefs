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
import {INGEN_KATEGORI, MINE_FARGEKATEGORIER} from '../../filtrering/filter-konstanter';

const selectValgtEnhetId = (state: AppState) => state.valgtEnhet.data.enhetId;
const selectPortefolje = (state: AppState) => state.portefolje;
const selectEnhetTiltak = (state: AppState) => state.enhettiltak;
const selectFiltervalgForListevisning = (state: AppState, listevisningType: OversiktType): FiltervalgModell =>
    getFiltreringState(state, listevisningType);
const selectListevisningForType = (state: AppState, listevisningType: OversiktType): ListevisningState =>
    selectListeVisning(state, listevisningType);

function filtrerBrukerePaValgtFargekategori(
    brukere: BrukerModell[],
    filtervalg: FiltervalgModell,
    oversiktType: OversiktType
): BrukerModell[] {
    const erEnhetensOversikt = oversiktType === OversiktType.enhetensOversikt;
    const fargekategorierErAktivert = filtervalg.ferdigfilterListe.includes(MINE_FARGEKATEGORIER);
    const valgteFargekategorier = filtervalg.fargekategorier;

    if (!erEnhetensOversikt || !fargekategorierErAktivert || valgteFargekategorier.length === 0) {
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
    selectFiltervalgForListevisning,
    selectListevisningForType,
    (enhettiltak, portefolje, enhetId, filtervalg, listevisning) => ({
        enhettiltak,
        portefolje,
        enhetId,
        sorteringsrekkefolge: portefolje.sorteringsrekkefolge,
        brukere: portefolje.data.brukere,
        filtervalg,
        listevisning,
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
    listevisning: ListevisningState;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
}

export function usePortefoljeSelector(listevisningType: OversiktType): UsePortefoljeSelector {
    return useSelector((state: AppState) => {
        const result = selectPortefoljeTabell(state, listevisningType);
        return {
            ...result,
            brukere: filtrerBrukerePaValgtFargekategori(result.brukere, result.filtervalg, listevisningType)
        };
    });
}
