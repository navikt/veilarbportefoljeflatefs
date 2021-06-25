import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';

interface VeilederidProps {
    role?: string;
    labelledBy?: string;
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

function VeilederId({role, labelledBy, className, skalVises, bruker}: VeilederidProps) {
    if (!skalVises) {
        return null;
    }

    return (
        <div role={role} aria-labelledby={labelledBy} className={className}>
            {bruker.veilederId}
        </div>
    );
}

export default VeilederId;
