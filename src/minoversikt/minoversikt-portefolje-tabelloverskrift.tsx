import React from 'react';
import MinOversiktListehode from './minoversikt-listehode';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import './minoversikt.css';

interface MinOversiktTabellProps {
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

function MinoversiktTabellOverskrift({settSorteringOgHentPortefolje}: MinOversiktTabellProps) {
    const {brukere, filtervalg, sorteringsrekkefolge, listevisning, sorteringsfelt} = usePortefoljeSelector(
        OversiktType.minOversikt
    );

    return (
        <MinOversiktListehode
            sorteringsrekkefolge={sorteringsrekkefolge}
            sorteringOnClick={settSorteringOgHentPortefolje}
            filtervalg={filtervalg}
            sorteringsfelt={sorteringsfelt}
            valgteKolonner={listevisning.valgte}
            brukere={brukere}
        />
    );
}

export default MinoversiktTabellOverskrift;
