import { headertekst, legendtekst } from './diagram-konstanter'
import moment from 'moment';
import { ytelsevalg } from '../../filtrering/filter-konstanter';

export function runningTotal(arr) {
    const runningTotal = new Array(arr.length);
    arr.reduce((acc, val, i) => {
        return runningTotal[i] = acc + val;
    }, 0);
    return runningTotal;
}

export function harYtelseSerie(lopendeSum, antallBrukere) {
    return new Array(lopendeSum.length)
                    .fill(antallBrukere)
                    .map((antall, i) => antall - lopendeSum[i]);
}

export function maned(brukere) {
    moment.locale('nb_no');

    const len = 12;
    const labels = new Array(len).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));
    const maaneder = new Array(len).fill(0).map((_, i) => `MND${i + 1}`);

    let antallMisterYtelse = new Array(len).fill(0);
    brukere
        .filter(bruker => bruker.utlopsdatoFasett)
        .map(bruker => {
            let index = maaneder.findIndex(element => element === bruker.utlopsdatoFasett);
            let value = antallMisterYtelse[index];
            antallMisterYtelse[index] = value + 1;
        });

    const lopendeSum = runningTotal(antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse: harYtelseSerie(lopendeSum, brukere.length)
    }
}

export function kvartal(brukere) {
    moment.locale('nb_no');

    const len = 16;
    const labels = new Array(len).fill(0).map((_, i) => {
        const quarter = moment().add(i, 'quarter');
        return `Q${quarter.quarter()}.${quarter.year()}`
    });
    const kvartaler = new Array(len).fill(0).map((_, i) => `KV${i + 1}`);

    let antallMisterYtelse = new Array(len).fill(0);
    brukere
        .filter(bruker => bruker.aapMaxtidFasett)
        .map(bruker => {
            let index = kvartaler.findIndex(element => element === bruker.aapMaxtidFasett);
            let value = antallMisterYtelse[index];
            antallMisterYtelse[index] = value + 1;
        });

    const lopendeSum = runningTotal(antallMisterYtelse);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse: harYtelseSerie(lopendeSum)
    };
}

export function ledetekster(filtreringvalg) {
    switch (filtreringvalg) {
        case ytelsevalg.DAGPENGER:
        case ytelsevalg.DAGPENGER_MED_PERMITTERING:
        case ytelsevalg.ORDINARE_DAGPENGER:
            return {
                headertekst: headertekst.DAGPENGER,
                legendtekst: legendtekst.DAGPENGER
            };
        case ytelsevalg.TILTAKSPENGER:
            return {
                headertekst: headertekst.TILTAKSPENGER,
                legendtekst: legendtekst.TILTAKSPENGER
            };
        case ytelsevalg.AAP_MAXTID:
            return {
                headertekst: headertekst.AAP_MAXTID,
                legendtekst: legendtekst.AAP_MAXTID
            };
        case ytelsevalg.AAP:
        case ytelsevalg.AAP_UNNTAK:
            return {
                headertekst: headertekst.AAP,
                legendtekst: legendtekst.AAP
            };
        default:
            return {
                headertekst: 'minoversikt.diagram.header.feil',
                legendtekst: ['minoversikt.diagram.header.feil', 'minoversikt.diagram.header.feil']
            };
    }
}

export default {
    maned,
    kvartal,
    ledetekster,
    runningTotal,
    harYtelseSerie
}
