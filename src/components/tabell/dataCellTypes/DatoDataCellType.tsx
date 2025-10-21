import {BodyShort} from '@navikt/ds-react';
import {Maybe} from '../../../utils/types';

interface Props {
    dato: Maybe<Date>;
    skalVises: boolean;
    className?: string;
}

export function DatoDataCellType({dato, skalVises = true, className}: Props) {
    if (!skalVises) {
        return null;
    }

    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
    if (!dato) {
        return (
            //  Sørger med dette for at spanen tar akkurat like mye plass som et felt med dato
            <BodyShort size="small" style={{visibility: 'hidden'}} className={className}>
                {new Date(0).toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
            </BodyShort>
        );
    }

    return (
        <BodyShort size="small" className={className}>
            {dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
        </BodyShort>
    );
}
