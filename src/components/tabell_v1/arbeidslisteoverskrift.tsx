import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';

interface ArbeidslisteOverskriftProps {
    role?: string;
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function ArbeidslisteOverskrift({role, className, skalVises, bruker}: ArbeidslisteOverskriftProps) {
    if (!skalVises) {
        return null;
    }

    return (
        <div role={role} className={className}>
            {bruker.arbeidsliste.overskrift}
        </div>
    );
}

export default ArbeidslisteOverskrift;
