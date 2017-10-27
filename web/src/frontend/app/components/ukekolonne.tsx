import * as React from 'react';

interface UkekolonneProps {
    ukerIgjen?: number;
    minVal: number;
    skalVises: boolean;
}

function lagUkerTekst(ukerIgjen, minVal) {
    if (ukerIgjen < 0) {
        return null;
    } else if (ukerIgjen < minVal) {
        return `Under ${minVal} uker`;
    }
    return `${ukerIgjen} uker`;
}

function UkeKolonne({ ukerIgjen, minVal, skalVises }: UkekolonneProps) {
    if (!skalVises) {
        return null;
    }
    return (<span className="col col-xs-2">{lagUkerTekst(ukerIgjen, minVal)}</span>);
}

export default UkeKolonne;
