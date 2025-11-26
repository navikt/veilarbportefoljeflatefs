import {AlertProps} from '@navikt/ds-react';
import {trackAlertVistEvent} from '../umami/umami-events';

export interface AlertVistLoggdata {
    variant: AlertProps['variant'];
    tekst: string;
}

export const loggVisningAvAlert = (data: AlertVistLoggdata) =>
    trackAlertVistEvent({
        variant: data.variant,
        tekst: data.tekst
    });
