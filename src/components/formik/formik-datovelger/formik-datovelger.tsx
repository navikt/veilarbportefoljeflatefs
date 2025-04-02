import {Field, FieldProps, getIn} from 'formik';
import classNames from 'classnames';
import {ErrorMessage, Label} from '@navikt/ds-react';
import {Datepicker} from 'nav-datovelger';
import {validerDatoFeldt} from '../../../utils/dato-utils';
import 'nav-datovelger/lib/styles/main.css';

interface FormikDatepickerProps {
    name: string;
}

export function FormikDatoVelger({name}: FormikDatepickerProps) {
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
                            }}
                            onChange={(date?: string) => setFieldValue(field.name, date)}
                            calendarSettings={{showWeekNumbers: true, position: 'responsive'}}
                            value={field.value}
                            dayPickerProps={{
                                className: 'datovelger__DayPicker'
                            }}
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>
                );
            }}
        </Field>
    );
}
