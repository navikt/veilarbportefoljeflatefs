import React from 'react';
import MinOversiktListehode from './minoversikt-listehode';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import './minoversikt.css';

interface MinOversiktTabellProps {
    innloggetVeileder: string;
    visesAnnenVeiledersPortefolje?: boolean;
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

function MinoversiktTabellOverskrift(props: MinOversiktTabellProps) {
    const {brukere, filtervalg, sorteringsrekkefolge, listevisning, sorteringsfelt} = usePortefoljeSelector(
        OversiktType.minOversikt
    );

    return (
        <MinOversiktListehode
            sorteringsrekkefolge={sorteringsrekkefolge}
            sorteringOnClick={props.settSorteringOgHentPortefolje}
            filtervalg={filtervalg}
            sorteringsfelt={sorteringsfelt}
            valgteKolonner={listevisning.valgte}
            brukere={brukere}
            oversiktType={OversiktType.enhetensOversikt}
        />
    );
}

export default MinoversiktTabellOverskrift;
