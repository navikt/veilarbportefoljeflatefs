import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';
import {Maybe} from '../../../utils/types';
import {toDate} from '../../../utils/dato-utils';

interface Props extends DataCellTypeProps {
    dato: Maybe<Date | string>;
}

export function DatoDataCellType({dato, skalVises = true, className}: Props) {
    if (!skalVises) {
        return null;
    }

    const parsetDato = toDate(dato);
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
    if (!parsetDato) {
        return (
            //  Sørger med dette for at spanen tar akkurat like mye plass som et felt med dato
            <BodyShort size="small" style={{visibility: 'hidden'}} className={className}>
                {new Date(0).toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
            </BodyShort>
        );
    }

    return (
        <BodyShort size="small" className={className}>
            {parsetDato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
        </BodyShort>
    );
}
