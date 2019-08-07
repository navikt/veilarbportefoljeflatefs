import * as React from 'react';
import moment from 'moment';

interface TidKolonneProps {
    className?: string;
    dato: number | null;
    skalVises?: boolean;
}

function TidKolonne({ dato }: TidKolonneProps) {
    if (!dato) {
        return null;
    }
    const duration = moment.duration(dato, 'minutes');
    const minutes = duration.get('minutes');
    const hours = duration.get('hours');
    let minutterString = minutes.toString();
    let timmerString = hours.toString();

    if(minutes < 10) {
        minutterString = '0' + minutterString;
    }

    if(hours < 10) {
        timmerString = '0' + timmerString;
    }

    return (
        <span>
        {`${timmerString}:${minutterString}`}
        </span>
    );
}

export default TidKolonne;
