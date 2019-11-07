import * as React from 'react';

interface DatokolonneProps {
    className?: string;
    dato?: Date;
    skalVises: boolean;
}

function DatoKolonne({ className, dato, skalVises = true}: DatokolonneProps) {
    if (!skalVises) {
        return null;
    }
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    if (!dato) {
        return (
            //  Sørger med dette for at spanen tar akkurat like mye plass som et felt med dato
            <span style={{ visibility: 'hidden' }} className={className}>
                {new Date(0).toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
            </span>);
    }

    return (
        <span className={className}>{dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}</span>
    );
}

export default DatoKolonne;
