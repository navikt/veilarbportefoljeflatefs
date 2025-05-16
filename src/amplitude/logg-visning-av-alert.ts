import {AlertProps} from '@navikt/ds-react';
import {trackAmplitude} from './amplitude';

export interface AlertVistLoggdata {
    variant: AlertProps['variant'];
    tekst: string;
}

export const loggVisningAvAlert = (data: AlertVistLoggdata) => {
    return trackAmplitude({
        name: 'alert vist',
        data: data
    });
};
