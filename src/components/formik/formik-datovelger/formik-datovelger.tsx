import {Field, FieldProps, getIn} from 'formik';
import {DateInputProps, DatePicker, ErrorMessage, useDatepicker} from '@navikt/ds-react';
import {formaterDateTilIsoDateString, validerDatoFelt} from '../../../utils/dato-utils';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface DatoVelgerProps {
    formikProps: FieldProps;
    size: DateInputProps['size'];
    label: string;
    name: string;
}

const DatoVelger = ({formikProps, size, label, name}: DatoVelgerProps) => {
    const {
        field,
        form: {setFieldValue, setFieldError}
    } = formikProps;

    const {datepickerProps, inputProps} = useDatepicker({
        defaultSelected: field.value && dayjs(field.value).isValid() ? dayjs(field.value).toDate() : undefined,
        onDateChange: (date?: Date) => setFieldValue(field.name, formaterDateTilIsoDateString(date)),
        inputFormat: 'dd.MM.yyyy',
        fromDate: new Date(),
        onValidate: val => {
            if (val.isBefore) {
                setFieldError(field.name, 'Fristen må være i dag eller senere');
            } else if (!val.isValidDate && !val.isEmpty) {
                setFieldError(field.name, 'Datoen du har oppgitt er ikke en gyldig dato');
            } else {
                formikProps.form.setFieldError(field.name, undefined);
            }
        }
    });

    const datepickerInputProps = {
        ...inputProps,
        label,
        size,
        name,
        id: name,
        className: 'skjemaelement__label',
        placeholder: 'dd.mm.åååå'
    };

    return (
        <DatePicker {...datepickerProps} showWeekNumber={true}>
            <DatePicker.Input {...datepickerInputProps} />
        </DatePicker>
    );
};

export const FormikDatoVelger = ({name}: {name: string}) => {
    return (
        <Field validate={(value: string) => validerDatoFelt(value, dayjs(), true)} name={name} id={name}>
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
};
