import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

interface Props extends DataCellTypeProps {
    ukerIgjen?: number;
    minVal: number;
}

export function UkeDataCellType({ukerIgjen, minVal, skalVises, className}: Props) {
    if (!skalVises) {
        return null;
    }

    const lagUkerTekst = (ukerIgjen, minVal) => {
        if (ukerIgjen === undefined || ukerIgjen === null || ukerIgjen <= 0) {
            return null;
        } else if (ukerIgjen < minVal) {
            return `Under ${minVal} uker`;
        }
        return `${ukerIgjen} uker`;
    };

    return (
        <BodyShort size="small" className={className}>
            {lagUkerTekst(ukerIgjen, minVal)}
        </BodyShort>
    );
}
