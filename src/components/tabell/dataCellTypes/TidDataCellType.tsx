import moment from 'moment';
import {BodyShort} from '@navikt/ds-react';
import {DataCellTypeProps} from './DataCellTypeProps';

interface Props extends DataCellTypeProps {
    tidSomMinutter: number | null;
}

export function TidDataCellType({tidSomMinutter, skalVises, className}: Props) {
    if (!skalVises || !tidSomMinutter) {
        return null;
    }
    const duration = moment.duration(tidSomMinutter, 'minutes');
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
