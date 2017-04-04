import React, { PropTypes as PT } from 'react';

const KolonneUtlopsdato = ({ utlopsdato }) => {
    const dato = new Date(utlopsdato.year, utlopsdato.monthValue, utlopsdato.dayOfMonth);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return <td>{dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}</td>;
};

KolonneUtlopsdato.propTypes = {
    utlopsdato: PT.object.isRequired
};

export default KolonneUtlopsdato;
