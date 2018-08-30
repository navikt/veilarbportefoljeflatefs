import * as React from 'react';
import { BrukerModell } from '../../model-interfaces';

interface VeilederidProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function VeilederId({className, skalVises, bruker}: VeilederidProps) {
    if (!skalVises) {
        return null;
    }

    return <div className={className}>
        {bruker.veilederId}
    </div>;
}

export default VeilederId;
