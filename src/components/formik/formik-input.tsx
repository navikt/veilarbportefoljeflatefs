import React from 'react';
import {Field, getIn} from 'formik';
import {Input} from 'nav-frontend-skjema';

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
                    <Input
                        id={name}
                        label="Tittel"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        bredde="L"
                        feil={feil}
                        value={field.value}
                        data-testid={`modal_arbeidsliste_tittel${indexId}`}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
