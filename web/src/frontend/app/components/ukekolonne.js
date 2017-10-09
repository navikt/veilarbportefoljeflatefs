import React from 'react';
import PT from 'prop-types';

function lagUkerTekst(ukerIgjen, minVal) {
    if (ukerIgjen < 0) {
        return null;
    } else if (ukerIgjen < minVal) {
        return `Under ${minVal} uker`;
    }
    return `${ukerIgjen} uker`;
}

function UkeKolonne({ ukerIgjen, minVal, skalVises }) {
    if (!skalVises) {
        return null;
    }
    return (<span>{lagUkerTekst(ukerIgjen, minVal)}</span>);
}

UkeKolonne.propTypes = {
    ukerIgjen: PT.number,
    minVal: PT.number.isRequired,
    skalVises: PT.bool
};

UkeKolonne.defaultProps = {
    dato: null
};


export default UkeKolonne;
