import React from 'react';
import {tekstValgteBrukere} from '../utils/tekst-utils';
import {useSelector} from 'react-redux';
import {AppState} from '../reducer';
import './tabell-overskrift.css';
import classNames from 'classnames';
import {Label} from '@navikt/ds-react';

function TabellOverskrift(props: {className?: string}) {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);
    const paginering = useSelector((state: AppState) => state.paginering);

    const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje;
    const {sidestorrelse} = paginering;

    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const tilIndex = fraIndex + antallReturnert;

    const maksBrukere = tilIndex > antallTotalt ? antallTotalt : tilIndex;

    const enEllerFlereBrukere =
        antallTotalt <= sidestorrelse
            ? `${maksBrukere}`
            : `${fraIndexMax ? fraIndex : 0} - ${maksBrukere ? maksBrukere : 0}`;
    const brukereGrammatikk = antallTotalt === 1 ? 'bruker' : 'brukere';
    const antallValgteBrukere = tekstValgteBrukere(brukere.filter(b => b.markert).length);

    return (
        <Label
            className={classNames('tabelloverskrift', props.className)}
            aria-live="polite"
            aria-atomic="true"
            size="small"
        >
            {`Viser ${enEllerFlereBrukere} av totalt ${antallTotalt ? antallTotalt : '0'} ${brukereGrammatikk}. `}
            {antallValgteBrukere}
        </Label>
    );
}

export default TabellOverskrift;
