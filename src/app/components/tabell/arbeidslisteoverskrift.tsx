import * as React from 'react';
import { BrukerModell } from '../../model-interfaces';

interface ArbeidslisteOverskriftProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function ArbeidslisteOverskrift({className, skalVises, bruker}: ArbeidslisteOverskriftProps) {
    if (!skalVises) {
        return null;
    }

    return <div className={className}>
        {bruker.arbeidsliste.overskrift}
    </div>;
}

export default ArbeidslisteOverskrift;
