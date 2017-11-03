import * as React from 'react';
import { BrukerModell } from '../../model-interfaces';
import { Kolonne } from '../../ducks/ui/listevisning';

interface VeilederidProps {
    className?: string;
    bruker: BrukerModell;
    valgteKolonner: Kolonne[];
}

function VeilederId({className, bruker, valgteKolonner}: VeilederidProps) {
    if (valgteKolonner.includes(Kolonne.NAVIDENT) && bruker.veilederId != null) {
        return <div className={className}>{bruker.veilederId}</div>;
    } else {
        return null;
    }
}

export default VeilederId;
