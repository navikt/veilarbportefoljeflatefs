import moment from 'moment';
import { DIAGRAMVISNING } from '../../minoversikt/minoversikt-konstanter';
import { ytelseFilterErAktiv } from '../../utils/utils';
import { ytelsevalg } from '../../filtrering/filter-konstanter';

export function runningTotal(arr) {
    return arr.reduce((acc, val, index) => {
        const prev = (index === 0) ? 0 : acc[index - 1];
        acc.push(prev + val);
        return acc;
    }, []);
}

export function medYtelseSerie(antallBrukere, antallMisterYtelse) {
    const lopendeSum = runningTotal(antallMisterYtelse);

    return new Array(antallMisterYtelse.length)
        .fill(antallBrukere)
        .map((verdi, index) => verdi - lopendeSum[index]);
}

export function maned(antallBrukere, diagramdata) {
    moment.locale('nb_no');

    const labels = new Array(12).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));

    const antallMisterYtelse = Object.values(diagramdata);
    const antallMedYtelse = medYtelseSerie(antallBrukere, antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

export function kvartal(antallBrukere, diagramdata) {
    moment.locale('nb_no');

    const labels = new Array(16).fill(0).map((_, i) => {
        const quarter = moment().add(i, 'quarter');
        return `Q${quarter.quarter()}.${quarter.year()}`;
    });

    const antallMisterYtelse = Object.values(diagramdata);
    const antallMedYtelse = medYtelseSerie(antallBrukere, antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

export function ledetekster(filtreringvalg) {
    const valg = filtreringvalg.toLowerCase();
    return {
        headertekst: `minoversikt.diagram.header.${valg}`,
        legendtekst: [
            `minoversikt.diagram.legend.${valg}.1`,
            `minoversikt.diagram.legend.${valg}.2`
        ]
    };
}

export function diagramSkalVises(visningsmodus, filtervalg) {
    return visningsmodus === DIAGRAMVISNING && ytelseFilterErAktiv(filtervalg) && filtervalg !== ytelsevalg.AAP_UNNTAK;
}


export default {
    maned,
    kvartal,
    ledetekster,
    runningTotal,
    medYtelseSerie,
    diagramSkalVises
};
