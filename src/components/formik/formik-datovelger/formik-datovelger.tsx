import React from 'react';
import dayjs from 'dayjs';
import DateHolidays, {HolidaysTypes} from 'date-holidays';
import {Field, FieldProps, getIn} from 'formik';
import {Datepicker} from 'nav-datovelger';
import {validerDatoFeldt} from '../../../utils/dato-utils';
import classNames from 'classnames';
import './daypicker.less';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import {Label} from '@navikt/ds-react';

const norwegianHolidays = new DateHolidays('no');

const getPublicHolidays = (from: Date, to: Date): HolidaysTypes.Holiday[] => {
    let days = [] as HolidaysTypes.Holiday[];
    const fromYear = from.getFullYear();
    const toYear = to.getFullYear();
    if (fromYear === toYear) {
        days = norwegianHolidays.getHolidays(fromYear);
    } else {
        let år = fromYear;
        while (år <= toYear) {
            days = [...days, ...norwegianHolidays.getHolidays(år)];
            år++;
        }
    }
    const start = dayjs(from).subtract(24, 'hour');
    const slutt = dayjs(to).add(24, 'hour');
    return days
        .filter(d => d.type === 'public')
        .map(d => ({
            ...d,
            date: d.date
        }))
        .filter(d => dayjs(d.date).isAfter(start, 'day') && dayjs(d.date).isBefore(slutt, 'day'));
};

const holidays = getPublicHolidays(
    dayjs()
        .subtract(4, 'year')
        .toDate(),
    dayjs()
        .add(4, 'year')
        .toDate()
);

const isPublicHoliday = (d: Date): boolean => {
    return holidays.some(d2 => dayjs(d2.date).isSame(d, 'day'));
};

interface FormikDatepickerProps {
    name: string;
}

function FormikDatoVelger({name}: FormikDatepickerProps) {
    return (
        <Field validate={(value: string) => validerDatoFeldt(value, new Date(), true)} name={name} id={name}>
            {({field, form: {errors, setFieldValue}}: FieldProps) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames('skjemaelement', 'datovelger', {
                    'datovelger--harFeil': error
                });
                return (
                    <div className={datePickerClassName}>
                        <Label className="skjemaelement__label" size="small">
                            Frist
                        </Label>
                        <Datepicker
                            inputId="fristDatovelger"
                            inputProps={{
                                name: 'frist',
                                placeholder: 'dd.mm.åååå'
                                // ariaLabel: 'Frist:'
                            }}
                            onChange={(date?: string) => setFieldValue(field.name, date)}
                            calendarSettings={{showWeekNumbers: true, position: 'responsive'}}
                            value={field.value}
                            dayPickerProps={{
                                className: 'datovelger__DayPicker',
                                modifiers: {isPublicHoliday}
                            }}
                        />
                        <SkjemaelementFeilmelding>{error}</SkjemaelementFeilmelding>
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikDatoVelger;
