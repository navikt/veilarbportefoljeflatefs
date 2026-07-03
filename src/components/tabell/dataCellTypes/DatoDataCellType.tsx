import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';
import {Maybe} from '../../../utils/types';
import {formaterDato} from '../../../utils/dato-utils';

interface Props extends DataCellTypeProps {
    dato: Maybe<string>;
}

export function DatoDataCellType({dato, skalVises = true, className}: Props) {
    if (!skalVises) {
        return null;
    }

    const formatertDato = formaterDato(dato);
    if (!formatertDato) {
        return (
            //  Sørger med dette for at spanen tar akkurat like mye plass som et felt med dato
            <BodyShort size="small" style={{visibility: 'hidden'}} className={className}>
                00.00.0000
            </BodyShort>
        );
    }

    return (
        <BodyShort size="small" className={className}>
            {formatertDato}
        </BodyShort>
    );
}
