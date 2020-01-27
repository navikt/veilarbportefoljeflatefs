import React from 'react';
import EnhetListehode from './enhet-listehode';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import './enhetsportefolje.less';
import './brukerliste.less';

interface EnhetTabellProps {
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

function EnhetTabellOverskrift(props: EnhetTabellProps) {
    const {filtervalg, sorteringsrekkefolge, valgteKolonner, sorteringsfelt} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    return (
        <EnhetListehode
            sorteringsrekkefolge={sorteringsrekkefolge}
            sorteringOnClick={props.settSorteringOgHentPortefolje}
            filtervalg={filtervalg}
            sorteringsfelt={sorteringsfelt}
            valgteKolonner={valgteKolonner}
            filtergruppe={ListevisningType.enhetensOversikt}
        />
    );
}

export default EnhetTabellOverskrift;
