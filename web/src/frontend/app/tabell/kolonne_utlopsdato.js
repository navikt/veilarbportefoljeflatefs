import React, { PropTypes as PT } from 'react';
import { brukerShape } from './../proptype-shapes';
import { ytelsevalg } from './../filtrering/filter-konstanter';

function lagUkerTekst(ukerIgjen, minVal) {
    if (ukerIgjen < 0) {
        return null;
    } else if (ukerIgjen < minVal) {
        return `Under ${minVal} uker`;
    }
    return `${ukerIgjen} uker`;
}

function harValgtYtelseUtlopsdato(ytelse) {
    return [ ytelsevalg.TILTAKSPENGER, ytelsevalg.AAP_UNNTAK, ytelsevalg.AAP].includes(ytelse);
}

const KolonneUtlopsdato = ({ bruker, ytelse }) => {
    let content = null;
    if (harValgtYtelseUtlopsdato(ytelse)) {
        const { utlopsdato } = bruker;
        if (utlopsdato) {
            const dato = new Date(utlopsdato.year, utlopsdato.monthValue - 1, utlopsdato.dayOfMonth);
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

            content = dato.toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], options);
        }
    } else if (ytelse === ytelsevalg.DAGPENGER || ytelse === ytelsevalg.ORDINARE_DAGPENGER) {
        content = lagUkerTekst(bruker.dagputlopUke, 2);
    } else if (ytelse === ytelsevalg.DAGPENGER_MED_PERMITTERING) {
        content = lagUkerTekst(bruker.permutlopUke, 2);
    } else if (ytelse === ytelsevalg.AAP_MAXTID) {
        content = lagUkerTekst(bruker.aapmaxtidUke, 12);
    }

    return (<td className="tabell-element-center">{content}</td>);
};

KolonneUtlopsdato.propTypes = {
    bruker: brukerShape.isRequired,
    ytelse: PT.string.isRequired
};

export default KolonneUtlopsdato;
