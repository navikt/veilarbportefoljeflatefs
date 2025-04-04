import {Field, FieldProps, getIn} from 'formik';
import {DateInputProps, ErrorMessage, useDatepicker} from '@navikt/ds-react';
import {DatePicker} from '@navikt/ds-react';
import {dateToISODate, validerDatoFeldt} from '../../../utils/dato-utils';
import classNames from 'classnames';

interface DatoVelgerProps {
    formikProps: FieldProps;
    size: DateInputProps['size'];
    label: string;
    name: string;
}

const DatoVelger = ({formikProps, size, label, name}: DatoVelgerProps) => {
    const {
        field,
        form: {setFieldValue}
    } = formikProps;

    const {datepickerProps, inputProps} = useDatepicker({
        defaultSelected: field.value ? new Date(field.value) : undefined,
        onDateChange: (date?: Date) => setFieldValue(field.name, dateToISODate(date)),
        inputFormat: 'dd.MM.yyyy',
        fromDate: new Date()
    });

    const datepickerInputProps = {
        ...inputProps,
        id: name,
        name,
        className: 'skjemaelement__label'
    };

    return (
        <DatePicker {...datepickerProps} showWeekNumber={true}>
            <DatePicker.Input size={size} label={label} placeholder="dd.mm.åååå" {...datepickerInputProps} />
        </DatePicker>
    );
};

export const FormikDatoVelger = ({name}: {name: string}) => {
    return (
        <Field
            validate={(value: string) => validerDatoFeldt(value, new Date(), true)}
            name={name}
            id={name}
            validateOnBlur
            validateOnChange
        >
            {(props: FieldProps) => {
                const error = getIn(props.form.errors, name);
                const datePickerClassName = classNames('skjemaelement', 'datovelger', {
                    'datovelger--harFeil': error
                });
                return (
                    <div className={datePickerClassName}>
                        <DatoVelger formikProps={props} size="small" label="Frist" name={name} />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>
                );
            }}
        </Field>
    );
}
