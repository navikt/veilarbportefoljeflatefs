import * as React from 'react';
import moment from 'moment';

interface TidKolonneProps {
    className?: string;
    dato: number | null;
    skalVises: boolean;
}

function TidKolonne({ className, dato, skalVises }: TidKolonneProps) {
    if (!skalVises || !dato) {
        return null;
    }
    const duration = moment.duration(dato, 'minutes');
    const minutes = duration.get('minutes');
    let minutterString = minutes.toString();

    if(minutes < 10) {
        minutterString = '0' + minutterString;
    }
    return (
        <span className={className}>
        {`${duration.get('hours')}:${minutterString}`}
        </span>
    );
}

export default TidKolonne;
