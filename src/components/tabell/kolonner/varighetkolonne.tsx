import moment from 'moment';
import {BodyShort} from '@navikt/ds-react';
import {formaterVarighetSomTimerOgMinutt} from '../../../utils/dato-utils';

interface VarighetKolonneProps {
    className?: string;
    dato: number | null;
    skalVises: boolean;
}

export function VarighetKolonne({className, dato, skalVises}: VarighetKolonneProps) {
    if (!skalVises || !dato) {
        return null;
    }

    const varighet = moment.duration(dato, 'minutes').as('minutes');

    return (
        <BodyShort size="small" className={className}>
            {formaterVarighetSomTimerOgMinutt(varighet)}
        </BodyShort>
    );
}
