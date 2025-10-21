import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

interface Props extends DataCellTypeProps {
    dato: number | null;
}

export function DagerSidenDataCellType({dato, skalVises, className}: Props) {
    if (!skalVises || dato === null) {
        return null;
    }

    const datoTekst = () => {
        if (dato === 0) {
            return 'I dag';
        } else if (dato === 1) {
            return '1 dag siden';
        } else {
            return `${dato} dager siden`;
        }
    };

    return (
        <BodyShort size="small" className={className}>
            {datoTekst()}
        </BodyShort>
    );
}
