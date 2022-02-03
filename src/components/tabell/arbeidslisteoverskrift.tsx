import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort} from '@navikt/ds-react';

interface ArbeidslisteOverskriftProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function ArbeidslisteOverskrift({className, skalVises, bruker}: ArbeidslisteOverskriftProps) {
    if (!skalVises) {
        return null;
    }

    return (
        <div className={className}>
            <BodyShort>{bruker.arbeidsliste.overskrift}</BodyShort>
        </div>
    );
}

export default ArbeidslisteOverskrift;
