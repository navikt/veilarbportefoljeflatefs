import React from 'react';
import EnhetListehode from './enhet-listehode';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../ducks/ui/listevisning';
import './enhetsportefolje.css';
import './brukerliste.css';
import {useSetPortefoljeSortering} from '../hooks/portefolje/use-sett-sortering';

function EnhetTabellOverskrift() {
    const {filtervalg, sorteringsrekkefolge, sorteringsfelt, listevisning} = usePortefoljeSelector(
        OversiktType.enhetensOversikt
    );
    const settSorteringOgHentPortefolje = useSetPortefoljeSortering(OversiktType.enhetensOversikt);

    return (
        <EnhetListehode
            sorteringsrekkefolge={sorteringsrekkefolge}
            sorteringOnClick={settSorteringOgHentPortefolje}
            filtervalg={filtervalg}
            sorteringsfelt={sorteringsfelt}
            valgteKolonner={listevisning.valgte}
            oversiktType={OversiktType.enhetensOversikt}
        />
    );
}

export default EnhetTabellOverskrift;
