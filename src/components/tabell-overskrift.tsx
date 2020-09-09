import React from 'react';
import {Element} from 'nav-frontend-typografi';
import {tekstValgteBrukere} from '../utils/tekst-utils';
import {useSelector} from "react-redux";
import {AppState} from "../reducer";
import './tabell-overskrift.less';

function TabellOverskrift(props: { className: string }) {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);

    const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje;

    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const tilIndex = fraIndex + antallReturnert;

    const maksBrukere = tilIndex > antallTotalt ? antallTotalt : tilIndex;

    const antallValgteBrukere = tekstValgteBrukere(brukere.filter(b => b.markert).length);
    const brukereGrammatikk = antallTotalt === 1 ? 'bruker' : 'brukere';
    const enEllerFlereBrukere = antallTotalt <= 20 ? `${maksBrukere}` : `${fraIndexMax} - ${maksBrukere}`

    return (
        <Element tag="h1" className={props.className}>
            <strong aria-live="polite" aria-atomic="true">
                {`Viser ${enEllerFlereBrukere} av totalt ${antallTotalt} ${brukereGrammatikk}. `}
                {antallValgteBrukere}
            </strong>
        </Element>
    );
}

export default TabellOverskrift;
