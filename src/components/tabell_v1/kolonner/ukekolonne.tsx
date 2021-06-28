import * as React from 'react';

interface UkekolonneProps {
    role?: string;
    labelledBy?: string;
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

function UkeKolonne({role, labelledBy, className, ukerIgjen, minVal, skalVises}: UkekolonneProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span role={role} aria-labelledby={labelledBy} className={className}>
            {' '}
            {lagUkerTekst(ukerIgjen, minVal)}{' '}
        </span>
    );
}

export default UkeKolonne;
