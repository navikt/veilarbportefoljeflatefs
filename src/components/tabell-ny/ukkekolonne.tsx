import * as React from 'react';

interface UkekolonneProps {
    className?: string;
    ukerIgjen?: number;
    minVal: number;
    skalVises: boolean;
}

function lagUkerTekst(ukerIgjen, minVal) {
    if (ukerIgjen < 0 || ukerIgjen === undefined) {
        return null;
    } else if (ukerIgjen < minVal) {
        return `Under ${minVal} uker`;
    }
    return `${ukerIgjen} uker`;
}

function UkeKolonne({ className, ukerIgjen, minVal, skalVises }: UkekolonneProps) {
    if (!skalVises) {
        return null;
    }
    return (<span className={className}>{lagUkerTekst(ukerIgjen, minVal)}</span>);
}

export default UkeKolonne;
