import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {Label} from '@navikt/ds-react';
import {tekstValgteBrukere} from '../utils/tekst-utils';
import {AppState} from '../reducer';
import './tabell-overskrift.css';

interface Props {
    className?: string;
}

export function TabellOverskrift({className}: Props) {
    const portefolje = useSelector((state: AppState) => state.portefolje.data);
    const paginering = useSelector((state: AppState) => state.paginering);

    const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje;
    const {sidestorrelse} = paginering;

    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    const fraIndexMax = Math.max(fraIndex, fixedFraIndex);
    const tilIndex = fraIndex + antallReturnert;

    const maksBrukere = tilIndex > antallTotalt ? antallTotalt : tilIndex;
    const fraBrukerNr = fraIndexMax ? fraIndex : 0;
    const tilBrukerNr = maksBrukere || 0;

    const enEllerFlereBrukere = antallTotalt <= sidestorrelse ? `${maksBrukere}` : `${fraBrukerNr} - ${tilBrukerNr}`;
    const brukereGrammatikk = antallTotalt === 1 ? 'bruker' : 'brukere';
    const antallValgteBrukere = tekstValgteBrukere(brukere.filter(b => b.markert).length);

    return (
        <Label className={classNames('tabelloverskrift', className)} aria-live="polite" aria-atomic="true" size="small">
            {`Viser ${enEllerFlereBrukere} av totalt ${antallTotalt || '0'} ${brukereGrammatikk}. `}
            {antallValgteBrukere}
        </Label>
    );
}
