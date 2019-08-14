import * as React from 'react';
import moment from 'moment';

interface TidKolonneProps {
    className?: string;
    dato: number | null;
    skalVises: boolean;
}

function VarighetKolonne({ className, dato, skalVises }: TidKolonneProps) {
    if (!skalVises || !dato) {
        return null;
    }
    const duration = moment.duration(dato, 'minutes');
    const minutes = duration.get('minutes');
    const hours = duration.get('hours');
    let minutterString = '';
    let timmerString = '';

    if(hours > 0) {
        timmerString = hours.toString() + "t";
    }

    if(minutes > 0) {
        minutterString = minutes.toString() + "min";
    }


    const kolonn = hours > 0 && minutes > 0 ? ':' : '';

    return (
        <span className={className}>
        {`${timmerString}${kolonn}${minutterString}`}
        </span>
    );
}

export default VarighetKolonne;
