import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';
import {formaterVarighetSomTimerOgMinutt} from '../../../utils/dato-utils';

interface Props extends DataCellTypeProps {
    varighetMinutter: number | null;
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
