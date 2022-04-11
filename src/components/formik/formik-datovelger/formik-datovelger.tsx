import React from 'react';
import {Field, FieldProps, getIn} from 'formik';
import {Datepicker} from 'nav-datovelger';
import {validerDatoFeldt} from '../../../utils/dato-utils';
import classNames from 'classnames';
import './daypicker.less';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import {Label} from '@navikt/ds-react';

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
                                className: 'datovelger__DayPicker'
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
