import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort} from '@navikt/ds-react';

interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell;
}

export default ({className, bruker}: BrukerFnrProps) => <BodyShort className={className}>{bruker.fnr}</BodyShort>;
