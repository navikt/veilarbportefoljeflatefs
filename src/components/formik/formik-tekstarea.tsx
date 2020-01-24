import React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Field, getIn } from 'formik';

const KOMMENTAR_MAKS_LENGDE = 500;

function FormikTekstArea({name}) {

    const validate = (value: string) => {
        let error: undefined | string;
        if (!value) {
            error = 'Du må fylle ut en kommentar';
        } else if (value.length > KOMMENTAR_MAKS_LENGDE) {
            error = `Du må korte ned teksten til ${KOMMENTAR_MAKS_LENGDE} tegn`;
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
                        textareaClass="skjemaelement__input input--fullbredde arbeidslistekommentar"
                        label="Kommentar"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={field.value}
                        name={name}
                        feil={feil}
                        maxLength={500}
                    />);
            }}
        </Field>
    );
}

export default FormikTekstArea;
