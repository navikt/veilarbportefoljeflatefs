import * as React from 'react';
import {Maybe} from '../../../utils/types';

interface DatokolonneProps {
    role: string;
    className?: string;
    dato: Maybe<Date>;
    skalVises: boolean;
}

function DatoKolonne({role, className, dato, skalVises = true}: DatokolonneProps) {
    if (!skalVises) {
        return null;
    }

    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};

    if (dato) {
        return <div role={role} className={className}>{dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}</div>;
    } else {
        return (
            //  Sørger med dette for at spanen tar akkurat like mye plass som et felt med dato
            <div style={{visibility: 'hidden'}} className={className}>
                {new Date(0).toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
            </div>
        );
    }
}

export default DatoKolonne;
