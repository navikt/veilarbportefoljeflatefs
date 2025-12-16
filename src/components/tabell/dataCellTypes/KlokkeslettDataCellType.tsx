import {DataCellTypeProps} from './DataCellTypeProps';
import {BodyShort} from '@navikt/ds-react';

interface Props extends DataCellTypeProps {
    dato: string | null;
}

export function KlokkeslettDataCellType({dato, skalVises = true, className}: Props) {
    if (!skalVises || dato === null || dato === '') {
        return null;
    }

    const datoObjekt = new Date(dato);
    const klokkeslett =
        datoObjekt.getHours().toString().padStart(2, '0') + ':' + datoObjekt.getMinutes().toString().padStart(2, '0');

    return (
        <BodyShort size="small" className={className}>
            {klokkeslett}
        </BodyShort>
    );
}
