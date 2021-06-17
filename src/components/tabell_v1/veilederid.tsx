import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';

interface VeilederidProps {
    role?: string;
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function VeilederId({role, className, skalVises, bruker}: VeilederidProps) {
    if (!skalVises) {
        return null;
    }

    return <div role={role} className={className}>{bruker.veilederId}</div>;
}

export default VeilederId;
