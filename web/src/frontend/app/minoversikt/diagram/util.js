import moment from 'moment';

export function runningTotal(arr) {
    return arr.reduce(
        (acc, val) => {
            const sum = ((acc.length && acc[acc.length - 1]) || 0) + val;
            acc.push(sum);
            return acc;
        },
        []
    );
}

export function groupByCount(arr, field) {
    return arr.reduce((acc, val) => {
        const key = val[field];
        const count = acc[key] || 0;
        acc[key] = count + 1;
        return acc;
    }, {});
}

export function medYtelseSerie(len, brukere, antallMisterYtelse) {
    const lopendeSum = runningTotal(antallMisterYtelse);
    return new Array(len)
        .fill(brukere.filter((b) => b.ytelse).length)
        .reduce(
            (acc, val, i) => {
                acc[i] = val - lopendeSum[i];
                return acc;
            },
            []
        );
}

export function maned(brukere) {
    moment.locale('nb_no');

    const len = 12;
    const labels = new Array(len).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));

    const maaneder = new Array(len)
                            .fill(0)
                            .map((_, i) => `MND${i + 1}`)
                            .reduce((acc, val) => ({ ...acc, [val]: 0 }), {});

    const countMisterYtelse = groupByCount(brukere.filter((b) => b.utlopsdatoFasett), 'utlopsdatoFasett');
    const antallMisterYtelse = Object.values({ ...maaneder, ...countMisterYtelse });
    const antallMedYtelse = medYtelseSerie(len, brukere, antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    };
}

export function kvartal(brukere) {
    moment.locale('nb_no');

    const len = 16;

    const labels = new Array(len).fill(0).map((_, i) => {
        const quarter = moment().add(i, 'quarter');
        return `Q${quarter.quarter()}.${quarter.year()}`;
    });

    const kvartaler = new Array(len)
                            .fill(0)
                            .map((_, i) => `KV${i + 1}`)
                            .reduce((acc, val) => ({ ...acc, [val]: 0 }), {});

    const countMisterYtelse = groupByCount(brukere.filter((b) => b.aapMaxtidFasett), 'aapMaxtidFasett');
    const antallMisterYtelse = Object.values({ ...kvartaler, ...countMisterYtelse });
    const antallMedYtelse = medYtelseSerie(len, brukere, antallMisterYtelse);

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

export default {
    maned,
    kvartal,
    ledetekster,
    runningTotal,
    medYtelseSerie
};
