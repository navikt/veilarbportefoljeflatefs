import React from 'react';
import {Field, getIn} from 'formik';
import {Label, TextField} from '@navikt/ds-react';

const TITTEL_MAKS_LENGDE = 30;

interface FormikInputProps {
    name: string;
    index?: number;
}

function FormikInput({name, index}: FormikInputProps) {
    const indexId = index ? `_${index}` : '';

    const validate = (value: string): string | undefined => {
        let error: undefined | string;
        if (!value) {
            error = 'Du må fylle ut en tittel';
        } else if (value.length > TITTEL_MAKS_LENGDE) {
            error = `Tittelen kan ikke være lenger enn ${TITTEL_MAKS_LENGDE} tegn.`;
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
                    <TextField
                        id={name}
                        size="small"
                        label="Tittel"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        error={feil}
                        value={field.value}
                        data-testid={`modal_arbeidsliste_tittel${indexId}`}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
