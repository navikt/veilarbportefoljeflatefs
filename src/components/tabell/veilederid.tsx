import {BodyShort} from '@navikt/ds-react';
import {BrukerModell} from '../../model-interfaces';

interface VeilederidProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

export function VeilederId({className, skalVises, bruker}: VeilederidProps) {
    if (!skalVises) {
        return null;
    }

    return (
        <div className={className}>
            <BodyShort size="small">{bruker.veilederId}</BodyShort>
        </div>
    );
}
