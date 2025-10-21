import classNames from 'classnames';
import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

interface Props extends DataCellTypeProps {
    /** Send inn "-" om det ikkje er noko tekst å vise */
    tekst: string;
}

export function TekstDataCellType({tekst, skalVises, className}: Props) {
    if (!skalVises) {
        return null;
    }

    return (
        <BodyShort size="small" className={classNames('ord-brekk', className)}>
            {tekst}
        </BodyShort>
    );
}
