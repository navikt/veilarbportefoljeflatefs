import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort} from '@navikt/ds-react';

interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell;
}

function BrukerFnr({className, bruker}: BrukerFnrProps) {
    return (
        <BodyShort size="small" className={className}>
            {bruker.fnr}
        </BodyShort>
    );
}

export default BrukerFnr;
