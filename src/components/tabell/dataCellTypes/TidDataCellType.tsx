import moment, {Duration} from 'moment';
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

    const minutter = (duration: Duration): string => {
        const minutter = duration.get('minutes');

        if (minutter < 10) {
            return '0' + minutter.toString();
        }
        return minutter.toString();
    };

    const timer = (duration: Duration): string => {
        const timer = duration.get('hours');

        if (timer < 10) {
            return '0' + timer.toString();
        }
        return timer.toString();
    };

    const timerMinutterString = `${timer(duration)}:${minutter(duration)}`;

    return (
        <BodyShort size="small" className={className}>
            {timerMinutterString}
        </BodyShort>
    );
}
