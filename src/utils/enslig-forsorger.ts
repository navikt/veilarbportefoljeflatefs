import moment from 'moment';
import {toDatePrettyPrint} from './dato-utils';

export const mapOmAktivitetsPlikt = (aktivitetsplikt?: boolean): string => {
    if (aktivitetsplikt === undefined) {
        return 'Ukjent';
    }
    return aktivitetsplikt ? 'Aktivitetsplikt' : 'Ikke aktivitetsplikt';
};

export const oppfolingsdatoEnsligeForsorgere = (alderBarn?: Date) => {
    if (!alderBarn) {
        return '';
    }
    const alderBarnMoment = moment(alderBarn);

    if (moment().diff(alderBarnMoment, 'months') < 6) {
        const datoBarnSeksMnd = alderBarnMoment.add({months: 6}).toDate();
        const formatertDato = toDatePrettyPrint(datoBarnSeksMnd);
        return `${formatertDato} (Barn 6 mnd)`;
    }
    const datoBarnEttAar = alderBarnMoment.add({years: 1}).toDate();
    const formatertDato = toDatePrettyPrint(datoBarnEttAar);
    return `${formatertDato} (Barn 1 år)`;
};
