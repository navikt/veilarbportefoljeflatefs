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

function stepper({ min, max, step }) {
    const arr = [];
    let start = 0;
    let end = min - 1;

    while (end <= max) {
        arr.push({ start, end });
        start = end + 1;
        end = start + step;
    }

    if (start < max) {
        arr.push({ start, end: max });
    }

    return arr;
}

function stepperRangeToDiagramKey({ start, end }) {
    if (start === 0) return `UKE_UNDER${end + 1}`;
    return `UKE${start}_${end}`;
}

function stepperRangeToLabel({ start, end }) {
    return `${start}-${end}`;
}

function ukeInndeling(antallBrukere, diagramdata, stepOptions) {
    const steps = stepper(stepOptions);
    const labels = steps.map(stepperRangeToLabel);
    const antallMisterYtelse = steps
        .map(stepperRangeToDiagramKey)
        .map((key) => diagramdata[key]);

    const antallMedYtelse = medYtelseSerie(antallBrukere, antallMisterYtelse);

    return { labels, antallMisterYtelse, antallMedYtelse, headerFormatSuffix: ' uker' };
}

export function maned(antallBrukere, diagramdata) {
    moment.locale('nb_no');

    const labels = new Array(12).fill(0).map((_, i) => moment().add(i, 'month').format('MMMM'));

    const antallMisterYtelse = Object.values(diagramdata);
    const antallMedYtelse = medYtelseSerie(antallBrukere, antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

export function lagYtelseDataFraFasett(antallBrukere, valgtYtelse, diagramdata) {
    if (valgtYtelse === ytelsevalg.AAP || valgtYtelse === ytelsevalg.TILTAKSPENGER) {
        return maned(antallBrukere, diagramdata);
    } else if (valgtYtelse === ytelsevalg.AAP_MAXTID) {
        return ukeInndeling(antallBrukere, diagramdata, { min: 12, max: 215, step: 11 });
    }
    return ukeInndeling(antallBrukere, diagramdata, { min: 2, max: 52, step: 3 });
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
    lagYtelseDataFraFasett,
    ledetekster,
    runningTotal,
    medYtelseSerie,
    diagramSkalVises
};
