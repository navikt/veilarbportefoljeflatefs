import React from 'react';
import EnhetListehode from './enhet-listehode';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {ListevisningType} from '../ducks/ui/listevisning';
import './enhetsportefolje.less';
import './brukerliste.less';
import {useSetPortefoljeSortering} from "../hooks/portefolje/use-sett-sortering";


function EnhetTabellOverskrift() {
    const {filtervalg, sorteringsrekkefolge, sorteringsfelt, listevisning} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const settSorteringOgHentPortefolje = useSetPortefoljeSortering(ListevisningType.enhetensOversikt);

    return (
        <div className="typo-undertekst blokk-xs enhet-tabell">
            <EnhetListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={sorteringsfelt}
                valgteKolonner={listevisning.valgte}
                filtergruppe={ListevisningType.enhetensOversikt}
            />
        </div>
    );
}

export default EnhetTabellOverskrift;
