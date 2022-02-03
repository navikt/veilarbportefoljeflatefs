import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort} from '@navikt/ds-react';

interface VeilederidProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function VeilederId({className, skalVises, bruker}: VeilederidProps) {
    if (!skalVises) {
        return null;
    }

    return (
        <div className={className}>
            <BodyShort>{bruker.veilederId}</BodyShort>
        </div>
    );
}

export default VeilederId;
