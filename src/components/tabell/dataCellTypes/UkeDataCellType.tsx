import {BodyShort} from '@navikt/ds-react';

function lagUkerTekst(ukerIgjen, minVal) {
    if (ukerIgjen < 0 || ukerIgjen === undefined) {
        return null;
    } else if (ukerIgjen < minVal) {
        return `Under ${minVal} uker`;
    }
    return `${ukerIgjen} uker`;
}

interface Props {
    ukerIgjen?: number;
    minVal: number;
    skalVises: boolean;
    className?: string;
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
