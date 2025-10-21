import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

function lagUkerTekst(ukerIgjen, minVal) {
    if (ukerIgjen < 0 || ukerIgjen === undefined) {
        return null;
    } else if (ukerIgjen < minVal) {
        return `Under ${minVal} uker`;
    }
    return `${ukerIgjen} uker`;
}

interface Props extends DataCellTypeProps {
    ukerIgjen?: number;
    minVal: number;
}

export function UkeDataCellType({ukerIgjen, minVal, skalVises, className}: Props) {
    if (!skalVises) {
        return null;
    }
    return (
        <BodyShort size="small" className={className}>
            {lagUkerTekst(ukerIgjen, minVal)}
        </BodyShort>
    );
}
