import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { tekstValgteBrukere } from '../utils/tekst-utils';

interface TabellOverskriftProps {
    fraIndex: number;
    antallIVisning: number;
    antallTotalt: number;
    visDiagram: boolean;
    antallValgt: number;
}

function TabellOverskrift({fraIndex, antallIVisning, antallTotalt, visDiagram, antallValgt}: TabellOverskriftProps) {
    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const tilIndex = fraIndex + antallIVisning;

    const tekst = visDiagram
        ? `Totalt ${antallTotalt} brukere.`
        : `Viser ${fraIndexMax}- ${tilIndex} av totalt ${antallTotalt} brukere. `;

    const antallValgteBrukere = tekstValgteBrukere(antallValgt);

    return (
        <Element tag="h1" className="blokk-xxs">
            <strong aria-live="polite" aria-atomic="true">
                {tekst}
                {antallValgteBrukere}
            </strong>
        </Element>
    );
}

export default TabellOverskrift;
