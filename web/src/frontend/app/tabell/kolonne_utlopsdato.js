import React from 'react';
import { utlopsdatoShape } from '../proptype-shapes';

const KolonneUtlopsdato = ({ utlopsdato }) => {
    const dato = new Date(utlopsdato.year, utlopsdato.monthValue, utlopsdato.dayOfMonth);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return (
        <td className="tabell-element-center">
            {dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
        </td>);
};

KolonneUtlopsdato.propTypes = {
    utlopsdato: utlopsdatoShape.isRequired
};

export default KolonneUtlopsdato;
