import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

interface Props extends DataCellTypeProps {
    dagerSiden: number | null;
}

export function DagerSidenDataCellType({dagerSiden, skalVises, className}: Props) {
    if (!skalVises || dagerSiden === null) {
        return null;
    }

    const datoTekst = () => {
        if (dagerSiden === 0) {
            return 'I dag';
        } else if (dagerSiden === 1) {
            return '1 dag siden';
        } else {
            return `${dagerSiden} dager siden`;
        }
    };

    return (
        <BodyShort size="small" className={className}>
            {datoTekst()}
        </BodyShort>
    );
}
