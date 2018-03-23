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

function ukeInndeling(antallBrukere, diagramdata) {
    const labels = diagramdata.map(({ fra, til }) => `${fra}-${til}`);
    const antallMisterYtelse = diagramdata.map((a) => a.verdi);

    const antallMedYtelse = medYtelseSerie(antallBrukere, antallMisterYtelse);

    return { labels, antallMisterYtelse, antallMedYtelse, headerFormatSuffix: ' uker' };
}

export function manedInndeling(antallBrukere, diagramdata) {
    moment.locale('nb_no');

    const labels = new Array(12).fill(0).map((_, i) => moment().add(i, 'month').format('MMMM'));
    const antallMisterYtelse = diagramdata.map((a) => a.verdi);
    const antallMedYtelse = medYtelseSerie(antallBrukere, antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

export function lagYtelseDataFraFasett(antallBrukere, valgtYtelse, diagramdata, intl) {
    const ytelsevalgIntl = ytelsevalg(intl);
    const sorterteDiagramdata = diagramdata.sort((a, b) => a.fra - b.fra);

    if (valgtYtelse === ytelsevalgIntl.TILTAKSPENGER || valgtYtelse === ytelsevalgIntl.AAP) {
        return manedInndeling(antallBrukere, sorterteDiagramdata);
    }
    return ukeInndeling(antallBrukere, sorterteDiagramdata);
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
    return visningsmodus === DIAGRAMVISNING && ytelseFilterErAktiv(filtervalg);
}

export default {
    lagYtelseDataFraFasett,
    ledetekster,
    runningTotal,
    medYtelseSerie,
    diagramSkalVises
};
