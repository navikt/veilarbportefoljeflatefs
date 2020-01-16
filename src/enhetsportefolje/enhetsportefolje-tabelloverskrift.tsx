import React from 'react';
import EnhetListehode from './enhet-listehode';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';

interface EnhetTabellProps {
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

function EnhetTabellOverskrift(props: EnhetTabellProps) {
    const {filtervalg, sorteringsrekkefolge, valgteKolonner, sorteringsfelt} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    return (
        <div className="typo-undertekst blokk-xs enhet-tabell">
            <EnhetListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={props.settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={sorteringsfelt}
                valgteKolonner={valgteKolonner}
                filtergruppe={ListevisningType.enhetensOversikt}
            />
        </div>
    );
}

export default EnhetTabellOverskrift;
