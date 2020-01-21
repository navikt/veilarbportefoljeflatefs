import React from 'react';
import EnhetListehode from './enhet-listehode';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import './enhetsportefolje.less';
import './brukerliste.less';
import {ASCENDING, DESCENDING} from "../konstanter";
import {useDispatch} from "react-redux";
import {hentPortefoljeForEnhet, settSortering} from "../ducks/portefolje";


function EnhetTabellOverskrift() {
    const {filtervalg, sorteringsrekkefolge, valgteKolonner, sorteringsfelt, enhetId} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const dispatch = useDispatch();

    function settSorteringOgHentPortefolje(felt) {

        let valgtRekkefolge = '';

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }

        dispatch(settSortering(valgtRekkefolge, felt));
        dispatch(hentPortefoljeForEnhet(enhetId!, valgtRekkefolge, felt, filtervalg));
    }

    return (
        <div className="typo-undertekst blokk-xs enhet-tabell">
            <EnhetListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={sorteringsfelt}
                valgteKolonner={valgteKolonner}
                filtergruppe={ListevisningType.enhetensOversikt}
            />
        </div>
    );
}

export default EnhetTabellOverskrift;
