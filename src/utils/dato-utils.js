import moment from 'moment';

export function fn(value) {
    return typeof value === 'function' ? value : () => value;
}

export function autobind(ctx) {
    Object.getOwnPropertyNames(ctx.constructor.prototype)
        .filter((prop) => typeof ctx[prop] === 'function')
        .forEach((method) => {
            // eslint-disable-next-line
            ctx[method] = ctx[method].bind(ctx);
        });
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}

export function guid() {
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export const erGyldigISODato = (isoDato) => !!(isoDato && moment(isoDato, moment.ISO_8601).isValid());

export const erGyldigFormattertDato = (formattertDato) => !!(formattertDato &&
    formattertDato.length === 10 &&
    moment(formattertDato, 'DD.MM.YYYY', true).isValid());

export const erGyldigDatoformat = (dato) => {
    const d = dato.replace(/\./g, '');
    let s = `${parseInt(d, 10)}`;
    if (dato.startsWith('0')) {
        s = `0${s}`;
    }
    if (dato.trim().length !== 10) {
        return false;
    }
    if (s.length !== 8) {
        return false;
    }
    return true;
};

export const erGyldigDato = (dato) => {
    // eslint-disable-next-line
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if (!re.test(dato)) {
        return false;
    }
    return erGyldigDatoformat(dato);
};

const erLocalDate = (dato) => dato.year && dato.monthValue && dato.dayOfMonth;

export const toDate = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }
    return erLocalDate(dato)
        ? new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth)
        : new Date(dato);
};

export const toDatePrettyPrint = (dato) => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }

    const date = toDate(dato);

    const days = date.getDate() < 10
        ? `0${date.getDate()}`
        : `${date.getDate()}`;
    const months = date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    const years = date.getFullYear();

    return `${days}.${months}.${years}`;
};

export const datePickerToISODate = (dato) => {
    const parsetDato = moment(dato, 'DD.MM.YYYY', true);
    return parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const dateToISODate = (dato) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : '';
};

/**
 * @return {string}
 */
export const ISODateToDatePicker = (dato) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

moment.updateLocale('nb', {
    monthsShort: [
        'jan',
        'feb',
        'mar',
        'apr',
        'mai',
        'jun',
        'jul',
        'aug',
        'sep',
        'okt',
        'nov',
        'des'
    ]
});

export function dateLess(date1, date2) {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();

    const mon1 = date1.getMonth();
    const mon2 = date2.getMonth();

    const day1 = date1.getDate();
    const day2 = date2.getDate();

    if (year1 < year2) return true;
    else if (year1 === year2 && mon1 < mon2) return true;

    return year1 === year2 && mon1 === mon2 && day1 < day2;
}

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
    return (tilMoment.get('hours') * 60) + tilMoment.get('minutes');
}

export function minuttDifferanse (klokkeslett2, klokkeslett1) {
    return moment.duration(moment(klokkeslett2).diff(klokkeslett1)).asMinutes()
}

export function validerDatoField(input, intl, alternativer, valgfritt) {
    const { fra } = alternativer;
    const inputDato = moment(input);

    const fraDato = moment(fra);

    if (!valgfritt && !input) {
        return intl.formatMessage({
            id: 'datepicker.feilmelding.mangler-dato'
        });
    } else if (input && !erGyldigISODato(input)) {
        return intl.formatMessage({
            id: 'datepicker.feilmelding.ugyldig-dato'
        });
    } else if (
        fra &&
        (fraDato.isAfter(inputDato, 'day'))
    ) {
        fraDato.subtract(1, 'day');

        const msgValues = {
            fradato: toDatePrettyPrint(fraDato.toDate())
        };
        return intl.formatMessage({
            id: 'datepicker.feilmelding.innenfor-periode',
            values: msgValues
        });
    }
    return undefined;
}



export function validerDatoFeldt(input, fra, valgfritt) {
    let error;
    const inputDato = moment(input);
    const fraDato = moment(fra);
    if (!valgfritt && !input) {
        error = 'Du må angi en frist';

    } else if (input && !erGyldigISODato(input)) {
        error = 'Datoen du har oppgitt er ikke en gyldig dato';
    } else if (
        fra &&
        (fraDato.isAfter(inputDato, 'day'))
    ) {

        error = 'Fristen må være i dag eller senere'
    }
    return error;
}
