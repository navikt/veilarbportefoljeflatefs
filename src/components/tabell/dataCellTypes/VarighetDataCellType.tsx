import {BodyShort} from '@navikt/ds-react';
import {formaterVarighetSomTimerOgMinutt} from '../../../utils/dato-utils';

interface Props {
    varighetMinutter: number | null;
    skalVises: boolean;
    className?: string;
}

export function VarighetDataCellType({varighetMinutter, skalVises, className}: Props) {
    if (!skalVises || !varighetMinutter) {
        return null;
    }

    return (
        <BodyShort size="small" className={className}>
            {formaterVarighetSomTimerOgMinutt(varighetMinutter)}
        </BodyShort>
    );
}
