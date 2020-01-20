import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { tekstValgteBrukere } from '../utils/tekst-utils';
import './tabell-overskrift.less';

interface TabellOverskriftProps {
    fraIndex: number;
    antallIVisning: number;
    antallTotalt: number;
    antallValgt: number;
    className: string;
}

function TabellOverskrift({fraIndex, antallIVisning, antallTotalt, antallValgt, className}: TabellOverskriftProps) {
    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const tilIndex = fraIndex + antallIVisning;

    const tekst = `Viser ${fraIndexMax}- ${tilIndex} av totalt ${antallTotalt} brukere. `;
    const antallValgteBrukere = tekstValgteBrukere(antallValgt);

    return (
        <Element tag="h1" className={className}>
            <strong aria-live="polite" aria-atomic="true">
                {tekst}
                {antallValgteBrukere}
            </strong>
        </Element>
    );
}

export default TabellOverskrift;
