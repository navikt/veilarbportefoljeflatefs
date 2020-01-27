import React from 'react';
import MinOversiktListehode from './minoversikt-listehode';
import { ListevisningType } from '../ducks/ui/listevisning';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import './minoversikt.less';

interface MinOversiktTabellProps {
    innloggetVeileder: string;
    visesAnnenVeiledersPortefolje?: boolean;
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

function MinoversiktTabellOverskrift(props: MinOversiktTabellProps) {
    const {brukere, filtervalg, sorteringsrekkefolge, valgteKolonner, sorteringsfelt} = usePortefoljeSelector(ListevisningType.minOversikt);

    return (
        <MinOversiktListehode
            sorteringsrekkefolge={sorteringsrekkefolge}
            sorteringOnClick={props.settSorteringOgHentPortefolje}
            filtervalg={filtervalg}
            sorteringsfelt={sorteringsfelt}
            valgteKolonner={valgteKolonner}
            brukere={brukere}
            filtergruppe={ListevisningType.enhetensOversikt}
        />
    );
}

export default MinoversiktTabellOverskrift;
