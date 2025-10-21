import moment from 'moment';
import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

interface Props extends DataCellTypeProps {
    dato: number | null;
}

export function TidDataCellType({dato, skalVises, className}: Props) {
    if (!skalVises || !dato) {
        return null;
    }
    const duration = moment.duration(dato, 'minutes');
    const minutes = duration.get('minutes');
    const hours = duration.get('hours');
    let minutterString = minutes.toString();
    let timmerString = hours.toString();

    if (minutes < 10) {
        minutterString = '0' + minutterString;
    }

    if (hours < 10) {
        timmerString = '0' + timmerString;
    }

    return <BodyShort size="small" className={className}>{`${timmerString}:${minutterString}`}</BodyShort>;
}
