import React, { PropTypes as PT } from 'react';

function DatoKolonne({ dato, skalVises }) {
    if (!skalVises || dato === null) {
        return null;
    }
    const date = new Date(dato);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return (
        <span>{date.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}</span>
    );
}

DatoKolonne.propTypes = {
    dato: PT.string.isRequired,
    skalVises: PT.bool.isRequired
};

export default DatoKolonne;
