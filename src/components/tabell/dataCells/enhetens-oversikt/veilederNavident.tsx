import {BodyShort} from '@navikt/ds-react';
import {DataCellProps} from '../DataCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';

export function VeilederNavident({bruker, valgteKolonner}: DataCellProps) {
    if (!valgteKolonner.includes(Kolonne.NAVIDENT)) {
        return null;
    }

    return (
        <div className="col col-xs-2">
            <BodyShort size="small">{bruker.veilederId}</BodyShort>
        </div>
    );
}
