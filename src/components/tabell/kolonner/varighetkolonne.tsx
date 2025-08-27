import {BodyShort} from '@navikt/ds-react';
import {formaterVarighetSomTimerOgMinutt} from '../../../utils/dato-utils';

interface VarighetKolonneProps {
    className?: string;
    varighetMinutter: number | null;
    skalVises: boolean;
}

export function VarighetKolonne({className, varighetMinutter, skalVises}: VarighetKolonneProps) {
    if (!skalVises || !varighetMinutter) {
        return null;
    }

    return (
        <BodyShort size="small" className={className}>
            {formaterVarighetSomTimerOgMinutt(varighetMinutter)}
        </BodyShort>
    );
}
