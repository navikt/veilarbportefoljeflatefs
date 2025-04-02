import {Field, getIn} from 'formik';
import {Textarea} from '@navikt/ds-react';

interface FormikTekstAreaProps {
    name: string;
    index?: number;
    label?: string;
    testId?: string;
    maxLengde: number;
    className?: string;
}

export function FormikTekstArea({name, index, label = '', testId, maxLengde, className}: FormikTekstAreaProps) {
    const indexId = index ? `_${index}` : '';

    const validate = (value: string) => {
        let error: undefined | string;
        if (value.length > maxLengde) {
            error = `Du må korte ned teksten til ${maxLengde} tegn`;
        }
        return error;
    };

    return (
        <Field validate={validate} name={name}>
            {({field, form}) => {
                const touched = getIn(form.touched, name);
                const errors = getIn(form.errors, name);
                const feil = touched && errors ? errors : undefined;
                return (
                    <Textarea
                        id={name}
                        size="small"
                        label={label}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={field.value}
                        name={name}
                        error={feil}
                        maxLength={maxLengde}
                        data-testid={`${testId}${indexId}`}
                        className={className}
                    />
                );
            }}
        </Field>
    );
}
