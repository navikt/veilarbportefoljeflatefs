import React, { PropTypes as PT } from 'react';
import { brukerShape } from './../proptype-shapes';
import { ytelsevalg } from './../filtrering/filter-konstanter';

const KolonneUtlopsdato = ({ bruker, ytelse }) => {
    let utlopsdato = bruker.utlopsdato;
    if (ytelse === ytelsevalg.AAP_MAXTID) {
        utlopsdato = bruker.aapMaxtid;
    }

    if (utlopsdato === null) {
        return null;
    }

    const dato = new Date(utlopsdato.year, utlopsdato.monthValue - 1, utlopsdato.dayOfMonth);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return (
        <td className="tabell-element-center">
            {dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options)}
        </td>);
};

KolonneUtlopsdato.propTypes = {
    bruker: brukerShape.isRequired,
    ytelse: PT.string.isRequired
};

export default KolonneUtlopsdato;
