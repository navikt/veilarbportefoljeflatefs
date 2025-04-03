import {MinOversiktListehode} from './minoversikt-listehode';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import './minoversikt.css';

interface MinOversiktTabellProps {
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

export function MinoversiktTabellOverskrift({settSorteringOgHentPortefolje}: MinOversiktTabellProps) {
    const {filtervalg, sorteringsrekkefolge, listevisning, sorteringsfelt} = usePortefoljeSelector(
        OversiktType.minOversikt
    );

    return (
        <MinOversiktListehode
            sorteringsrekkefolge={sorteringsrekkefolge}
            sorteringOnClick={settSorteringOgHentPortefolje}
            filtervalg={filtervalg}
            sorteringsfelt={sorteringsfelt}
            valgteKolonner={listevisning.valgte}
        />
    );
}
