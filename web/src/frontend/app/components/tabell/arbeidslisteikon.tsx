import * as React from 'react'
import * as classNames from 'classnames';
import {BrukerModell} from '../../model-interfaces';

interface ArbeidslisteikonProps {
    bruker: BrukerModell;
    className?: string;
}

const cls = (className?: string) => classNames('arbeidsliste--ikon', className);

export default ({ bruker, className }: ArbeidslisteikonProps) => {
    const skalVises = bruker.arbeidsliste.arbeidslisteAktiv;
    return <div className={ skalVises ? cls(className) : className}>&nbsp;</div>;
}
