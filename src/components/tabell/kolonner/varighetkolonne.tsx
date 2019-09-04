import * as React from 'react';
import moment from 'moment';

interface VarighetKolonneProps {
    className?: string;
    dato: number | null;
    skalVises: boolean;
}

function VarighetKolonne({ className, dato, skalVises }: VarighetKolonneProps) {
    if (!skalVises || !dato) {
        return null;
    }
    const varighet = moment.duration(dato, 'minutes');
    const minutter = varighet.get('minutes');
    const timer = varighet.get('hours');
    let minutterString = '';
    let timerString = '';

    if(timer > 0) {
        timerString = timer.toString() + "t";
    }

    if(minutter > 0) {
        minutterString = minutter.toString() + "min";
    }


    const kolonn = timer > 0 && minutter > 0 ? ' ': '';

    return (
        <span className={className}>
        {`${timerString}${kolonn}${minutterString}`}
        </span>
    );
}

export default VarighetKolonne;
