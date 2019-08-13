import * as React from 'react';
import { BrukerModell } from '../../model-interfaces';

interface ArbeidslisteOverskriftProps {
    bruker: BrukerModell;
}

function ArbeidslisteOverskrift({bruker}: ArbeidslisteOverskriftProps) {

    return (
        <div>
            {bruker.arbeidsliste.overskrift}
        </div>
    );
}

export default ArbeidslisteOverskrift;
