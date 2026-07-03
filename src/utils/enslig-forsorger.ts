import dayjs from 'dayjs';

export const mapOmAktivitetsPlikt = (aktivitetsplikt?: boolean): string => {
    if (aktivitetsplikt === undefined) {
        return 'Ukjent';
    }
    return aktivitetsplikt ? 'Aktivitetsplikt' : 'Ikke aktivitetsplikt';
};

export const oppfolingsdatoEnsligeForsorgere = (yngsteBarsFoedselsdato?: string) => {
    if (!yngsteBarsFoedselsdato) {
        return '';
    }

    const foedselsdatoDayjs = dayjs(yngsteBarsFoedselsdato);

    if (dayjs().diff(foedselsdatoDayjs, 'month') < 6) {
        return `${foedselsdatoDayjs.add(6, 'month').format('DD.MM.YYYY')} (Barn 6 mnd)`;
    }

    return `${foedselsdatoDayjs.add(1, 'year').format('DD.MM.YYYY')} (Barn 1 år)`;
};
