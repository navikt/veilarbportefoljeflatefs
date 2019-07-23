import moment from 'moment';
import { DIAGRAMVISNING } from '../minoversikt-konstanter';
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

const diagramHeaderValg = {
    aap_maxtid: 'AAP Maxtid',
    aap: 'AAP',
    aap_unntak : 'AAP med unntak',
    dagpenger_med_permittering_fiskeindustri: 'Dagpenger v/perm fiskeindustri',
    dagpenger_med_permittering: 'Dagpenger ved permittering',
    dagpenger: 'Dagpenger',
    lonnsgarantimidler_dagpenger : 'Lønnsgarantimidler dagpenger',
    ordinare_dagpenger: 'Ordinære dagpenger',
    tiltakspenger: 'Tiltakspenger',
};

const diagramLegendValg = {
    'aap.1': 'Brukere med AAP',
    'aap.2': 'Brukere med AAP som mister ytelse i gjeldende mnd',
    'aap_maxtid.1': 'Brukere med AAP innenfor maxtid',
    'aap_maxtid.2': 'Brukere med AAP innenfor maxtid som har brukt opp rettighet i gjeldende periode',
    'aap_unntak.1': 'Brukere med AAP unntak',
    'aap_unntak.2': 'Brukere med AAP unntak som har brukt opp rettighet i gjeldende periode',
    'dagpenger.1': 'Brukere med dagpenger',
    'dagpenger.2': 'Brukere med dagpenger som mister ytelse i gjeldende periode ',
    'dagpenger_med_permittering.1': 'Brukere med dagpenger permittering',
    'dagpenger_med_permittering.2': 'Brukere med dagpenger permittering som mister ytelse i gjeldende periode',
    'dagpenger_med_permittering_fiskeindustri.1': 'Brukere med dagpenger v/perm fiskeindustri',
    'dagpenger_med_permittering_fiskeindustri.2': 'Brukere med dagpenger v/perm fiskeindustri som mister ytelse i gjeldende mnd',
    'lonnsgarantimidler_dagpenger.1': 'Brukere med lønnsgarantimidler dagpenger',
    'lonnsgarantimidler_dagpenger.2': 'Brukere med lønnsgarantimidler dagpenger som mister ytelse i gjeldende mnd',
    'ordinare_dagpenger.1': 'Brukere med ordinære dagpenger',
    'ordinare_dagpenger.2': 'Brukere med ordinære dagpenger som mister ytelse i gjeldende periode',
    'tiltakspenger.1': 'Brukere med tiltakspenger',
    'tiltakspenger.2': 'Brukere med tiltakspenger som mister ytelse i gjeldende mnd',
};


export function ledetekster(filtreringvalg) {
    const valg = filtreringvalg.toLowerCase();
    return {
        headertekst: diagramHeaderValg[valg],
        legendtekst: [diagramLegendValg[`${valg}.1`], diagramLegendValg[`${valg}.2`]]
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
