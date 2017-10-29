import * as React from 'react';
import {BrukerModell} from "../../model-interfaces";
import {Kolonne} from "../../ducks/ui/listevisning";

interface VeilederidProps {
    className?: string;
    bruker: BrukerModell;
    valgteKolonner: Kolonne[];
}

function VeilederId({className, bruker, valgteKolonner}: VeilederidProps) {
    const ident = bruker.veilederId || '';
    if (valgteKolonner.includes(Kolonne.NAVIDENT)) {
        return <div className={className}>{ident}</div>
    } else {
        return null;
    }
}

export default VeilederId
