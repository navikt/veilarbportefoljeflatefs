import { headertekst, legendtekst } from './diagram-konstanter'
import moment from 'moment';
import { ytelsevalg } from '../../filtrering/filter-konstanter';

export function maned(brukere) {
    moment.locale('nb_no');

    const labels = new Array(12).fill(0).map((_, i) => moment().add(i + 1, 'month').format('MMMM'));

    const maaneder = new Array(12).fill(0).map((_, i) => `MND${i + 1}`);

    let antallMisterYtelse = new Array(12).fill(0);
    brukere
        .filter(bruker => bruker.utlopsdatoFasett)
        .map(bruker => {
            let index = maaneder.findIndex(element => element === bruker.utlopsdatoFasett);
            let value = antallMisterYtelse[index];
            antallMisterYtelse[index] = value + 1;
        });


    let runningSum = new Array(12);
    antallMisterYtelse.reduce((acc, val, i) => {
        return runningSum[i] = acc + val;
    }, 0);

    const antallMedYtelse = new Array(12)
        .fill(brukere.length)
        .map((antall, i) => antall - runningSum[i]);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
    }
}

export function kvartal(brukere) {
    moment.locale('nb_no');

    const labels = new Array(16).fill(0).map((_, i) => {
        const quarter = moment().add(i, 'quarter');
        return `Q${quarter.quarter()}.${quarter.year()}`
    });

    const kvartaler = new Array(16).fill(0).map((_, i) => `KV${i + 1}`);

    let antallMisterYtelse = new Array(16).fill(0);
    brukere
        .filter(bruker => bruker.aapMaxtidFasett)
        .map(bruker => {
            let index = kvartaler.findIndex(element => element === bruker.aapMaxtidFasett);
            let value = antallMisterYtelse[index];
            antallMisterYtelse[index] = value + 1;
        });

    let runningSum = new Array(16);
    antallMisterYtelse.reduce((acc, val, i) => {
        return runningSum[i] = acc + val;
    }, 0);

    const antallMedYtelse = new Array(16)
        .fill(brukere.length)
        .map((antall, i) => antall - runningSum[i]);

    return {
        labels,
        antallMisterYtelse,
        antallMedYtelse
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
    ledetekster
}
