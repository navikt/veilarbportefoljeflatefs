import React from 'react';
import { Field, getIn } from 'formik';
import { Input } from 'nav-frontend-skjema';

const TITTEL_MAKS_LENGDE = 30;

function FormikInput({name}) {

    const validate = (value: string): string| undefined => {
        let error: undefined| string;
        if(!value) {
            error = 'Du må fylle ut en tittel';
        } else if(value.length > TITTEL_MAKS_LENGDE) {
            error = `Tittelen kan ikke være lenger enn ${TITTEL_MAKS_LENGDE}`;
        }
        return error;
    };

    return (
        <Field validate={validate} name={name}>
            {({ field, form})  => {
                const touched = getIn(form.touched, name);
                const errors = getIn(form.errors, name);
                return(
                    <Input
                        id={name}
                        label="Tittel"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name={name}
                        bredde="M"
                        feil={errors && touched ? {feilmelding: errors} : undefined}
                        value={field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
