import {AlertProps} from '@navikt/ds-react';
import {trackAmplitude} from './amplitude';

interface alertVistData {
    variant: AlertProps['variant'];
    tekst: string;
}

export const loggVisningAvAlert = (data: alertVistData) => {
    return trackAmplitude({
        name: 'alert vist',
        data: data
    });
};
