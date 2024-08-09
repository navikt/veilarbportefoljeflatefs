import React from 'react';
import {Field, FieldProps, getIn} from 'formik';
import {toReversedDateStr, validerDatoFeldt} from '../../../utils/dato-utils';
import classNames from 'classnames';
import 'nav-datovelger/lib/styles/main.css';
import {DateInputProps, DatePicker, ErrorMessage, Label, useDatepicker} from '@navikt/ds-react';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
    size?: DateInputProps['size'];
    classname?: string;
}

interface DatoVelgerProps {
    formikProps: FieldProps;
    ariaLabel: string;
    size: DateInputProps['size'];
    label: string;
    name: string;
}

const DatoVelger = ({formikProps, ariaLabel, size, label, name}: DatoVelgerProps) => {
    const {
        field,
        form: {setFieldValue}
    } = formikProps;
    const {inputProps, datepickerProps} = useDatepicker({
        defaultSelected: field.value ? new Date(field.value) : undefined,
        inputFormat: 'dd.MM.yyyy',
        onDateChange: (date?: Date) => {
            setFieldValue(field.name, date ? toReversedDateStr(date) : null);
        }
    });

    const datepickerInputProps = {
        ...inputProps,
        id: name,
        name,
        placeholder: 'dd.mm.åååå',
        'aria-label': ariaLabel
    };

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input size={size} label={label} {...datepickerInputProps} />
        </DatePicker>
    );
};

function FormikDatoVelger({name, label, size, ariaLabel}: FormikDatepickerProps) {
    return (
        <Field validate={(value: string) => validerDatoFeldt(value, new Date(), true)} name={name} id={name}>
            {(formProps: FieldProps) => {
                const error = getIn(formProps.form.errors, name);
                const datePickerClassName = classNames('skjemaelement', 'datovelger', {
                    'datovelger--harFeil': error
                });

                return (
                    <div className={datePickerClassName}>
                        <DatoVelger
                            formikProps={formProps}
                            ariaLabel={ariaLabel}
                            size={size}
                            label={label}
                            name={name}
                        />
                        {error && <ErrorMessage size={size}>{error}</ErrorMessage>}
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikDatoVelger;
