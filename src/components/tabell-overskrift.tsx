import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { tekstValgteBrukere } from '../utils/tekst-utils';
import {useSelector} from "react-redux";
import {AppState} from "../reducer";

interface TabellOverskriftProps {
    fraIndex: number;
    antallIVisning: number;
    antallTotalt: number;
    visDiagram: boolean;
    antallValgt: number;
}

function TabellOverskrift() {
    const portefolje = useSelector((state: AppState)=> state.portefolje.data);

    const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje;
    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const antallValgt = brukere.filter((bruker) => bruker.markert).length;

    const tilIndex = fraIndex + antallReturnert;

    const antallValgteBrukere = tekstValgteBrukere (antallValgt);

    return (
        <Element tag="h1" className="blokk-xxs">
            <strong aria-live="polite" aria-atomic="true">
                `Viser ${fraIndexMax}- ${tilIndex} av totalt ${antallTotalt} brukere. `
                {antallValgteBrukere}
            </strong>
        </Element>
    );
}

export default TabellOverskrift;
