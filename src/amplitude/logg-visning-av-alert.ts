import {AlertProps} from '@navikt/ds-react';
import {trackAlertVistEvent} from '../umami/umami';

export interface AlertVistLoggdata {
    variant: AlertProps['variant'];
    tekst: string;
}

export const loggVisningAvAlert = (data: AlertVistLoggdata) => trackAlertVistEvent(data.variant, data.tekst);
