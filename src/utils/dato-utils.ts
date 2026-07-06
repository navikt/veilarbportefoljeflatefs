import {Maybe} from './types';
import {SkjermingEtikettConfig} from '../model-interfaces';
import dayjs from 'dayjs';

export const fomraterTilNorskDateString = (dato: Maybe<string>) => {
    if (!dato) {
        return null;
    }
    const parsed = dayjs(dato);
    return parsed.isValid() ? parsed.format('DD.MM.YYYY') : null;
};

// dato velgeren
export function validerDatoFelt(input, fra, valgfritt) {
    let error;
    const inputDato = dayjs(input);
    const fraDato = dayjs(fra);

    if (!valgfritt && !input) {
        error = 'Du må angi en frist';
    } else if (input && !inputDato.isValid()) {
        error = 'Datoen du har oppgitt er ikke en gyldig dato';
    } else if (fra && fraDato.isAfter(inputDato, 'day')) {
        error = 'Fristen må være i dag eller senere';
    }
    return error;
}

export const formaterDateTilIsoDateString = (dato?: Date | string) => {
    if (!dato) return dato;
    const parsed = dayjs(dato);
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : undefined;
};

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

export function oppfolgingStartetDato(dato: string): Maybe<string> {
    const tidligsteOppfolgingsdato = dayjs('2017-12-04');
    const oppfolgingStartetDato = dayjs(dato);
    if (!oppfolgingStartetDato) {
        return null;
    }

    return oppfolgingStartetDato.isBefore(tidligsteOppfolgingsdato) ? '2017-12-04' : dato;
}

export function hentSkjermetInfo(egenAnsatt: boolean | null, skjermetTil: string | null): SkjermingEtikettConfig {
    if (!egenAnsatt) {
        return {
            hidden: true,
            tittel: null,
            type: 'info'
        };
    }

    const daysUntil = dayjs(skjermetTil).diff(dayjs(), 'days');
    const tittelVerdi = !skjermetTil ? 'Skjermet' : 'Skjermet til ' + fomraterTilNorskDateString(skjermetTil);

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
