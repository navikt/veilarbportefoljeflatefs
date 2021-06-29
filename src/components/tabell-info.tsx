import React from 'react';
import {Element} from 'nav-frontend-typografi';
import {tekstValgteBrukere} from '../utils/tekst-utils';
import {useSelector} from 'react-redux';
import {AppState} from '../reducer';
import './tabell-overskrift.less';
import classNames from 'classnames';

function TabellInfo(props: {className?: string}) {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);

    const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje;

    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const tilIndex = fraIndex + antallReturnert;

    const maksBrukere = tilIndex > antallTotalt ? antallTotalt : tilIndex;

    const enEllerFlereBrukere =
        antallTotalt <= 20 ? `${maksBrukere}` : `${fraIndexMax ? fraIndex : 0} - ${maksBrukere ? maksBrukere : 0}`;
    const brukereGrammatikk = antallTotalt === 1 ? 'bruker' : 'brukere';
    const antallValgteBrukere = tekstValgteBrukere(brukere.filter(b => b.markert).length);

    return (
        <Element
            tag="h2"
            className={classNames('tabelloverskrift', props.className)}
            aria-live="polite"
            aria-atomic="true"
        >
            {`Viser ${enEllerFlereBrukere} av totalt ${antallTotalt ? antallTotalt : '0'} ${brukereGrammatikk}. `}
            {antallValgteBrukere}
        </Element>
    );
}

export default TabellInfo;
