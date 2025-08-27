import moment from 'moment';
import {Maybe} from './types';
import {SkjermingEtikettConfig} from '../model-interfaces';

export const erGyldigISODato = isoDato => isoDato && moment(isoDato, moment.ISO_8601).isValid();

function erLocalDate(dato): boolean {
    return dato.year && dato.monthValue && dato.dayOfMonth;
}

export function toDate(dato): Maybe<Date> {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }
    return erLocalDate(dato) ? new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth) : new Date(dato);
}

export function toDatePrettyPrint(dato): Maybe<string> {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }

    const date = toDate(dato);
    if (!date) {
        return null;
    }

    const days = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const months = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const years = date.getFullYear();

    return `${days}.${months}.${years}`;
}

export const toDateString = (dato): string =>
    new Date(dato).toLocaleDateString(['nb-no', 'nn-no', 'en-gb', 'en-us'], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

export const dateToISODate = dato => {
    const parsetDato = moment.parseZone(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('YYYY-MM-DD') : dato;
};

export function dateGreater(date1, date2) {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();

    const mon1 = date1.getMonth();
    const mon2 = date2.getMonth();

    const day1 = date1.getDate();
    const day2 = date2.getDate();

    if (year1 > year2) return true;
    else if (year1 === year2 && mon1 > mon2) return true;

    return year1 === year2 && mon1 === mon2 && day1 > day2;
}

export function klokkeslettTilMinutter(klokkeSlett) {
    const tilMoment = moment(klokkeSlett);
    return tilMoment.get('hours') * 60 + tilMoment.get('minutes');
}

export function minuttDifferanse(klokkeslett2, klokkeslett1) {
    return moment.duration(moment(klokkeslett2).diff(klokkeslett1)).asMinutes();
}

/**
 * Returnerer varighet (minutt) som tekst på formatet "[timer]t [minutt]min".
 *
 * Dersom [timer] eller [minutt] er 0 vert ikkje dette leddet vist i teksten.
 *
 * Eksempel:
 *   15 min -> "15min"
 *   60 min -> "1t"
 *   75 min -> "1t 15min"
 * */
export function formaterVarighetSomTimerOgMinutt(varighetMinutter: number) {
    const timer = Math.floor(varighetMinutter / 60);
    const minutter = varighetMinutter % 60;

    const timerString = timer > 0 ? `${timer}t` : '';
    const minutterString = minutter > 0 ? `${minutter}min` : '';
    const mellomrom = timer > 0 && minutter > 0 ? ' ' : '';

    return timerString + mellomrom + minutterString;
}

export function dagerSiden(dato) {
    if (!dato) {
        return null;
    }
    const hentDato = moment(dato, 'YYYY-MM-DD');
    return moment().diff(hentDato, 'days');
}

export function validerDatoFelt(input, fra, valgfritt) {
    let error;
    const inputDato = moment(input);
    const fraDato = moment(fra);
    if (!valgfritt && !input) {
        error = 'Du må angi en frist';
    } else if (input && !erGyldigISODato(input)) {
        error = 'Datoen du har oppgitt er ikke en gyldig dato';
    } else if (fra && fraDato.isAfter(inputDato, 'day')) {
        error = 'Fristen må være i dag eller senere';
    }
    return error;
}

export function oppfolgingStartetDato(dato: string): Maybe<Date> {
    if (!dato) {
        return null;
    }

    const oppfolgingStartetDato = new Date(dato);
    const tidligsteDato = new Date('2017-12-04');

    return oppfolgingStartetDato < tidligsteDato ? tidligsteDato : oppfolgingStartetDato;
}

export function hentSkjermetInfo(
    egenAnsatt: boolean | undefined,
    skjermetTil: string | undefined
): SkjermingEtikettConfig {
    if (!egenAnsatt) {
        return {
            hidden: true,
            tittel: null,
            type: 'info'
        };
    }

    const daysUntil = moment(skjermetTil).diff(moment(), 'days');
    const tittelVerdi = !skjermetTil ? 'Skjermet' : 'Skjermet til ' + moment(skjermetTil).format('DD.MM.YYYY');

    if (daysUntil < 5) {
        return {
            hidden: false,
            tittel: tittelVerdi,
            type: 'error'
        };
    } else if (daysUntil <= 14) {
        return {
            hidden: false,
            tittel: tittelVerdi,
            type: 'warning'
        };
    } else {
        return {
            hidden: false,
            tittel: tittelVerdi,
            type: 'info'
        };
    }
}
