import * as React from 'react';

interface TidKolonneProps {
    className?: string;
    dato?: Date | null;
    skalVises: boolean;
}

function TidKolonne({ className, dato, skalVises }: TidKolonneProps) {
    if (!skalVises || !dato) {
        return null;
    }

    const timmer = dato.getHours().toString();

    const minutter = dato.getMinutes();
    let minutterString = minutter.toString();

    if(minutter < 10) {
        minutterString = '0' + minutterString;
    }

    return (
        <span className={className}>
        {`${timmer}:${minutterString}`}
        </span>
    );
}

export default TidKolonne;
