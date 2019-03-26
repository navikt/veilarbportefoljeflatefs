import React from 'react';
import {Field, getIn} from "formik";
import {Input} from "nav-frontend-skjema";
import {injectIntl} from 'react-intl';

const OVERSKRIFT_MAKS_LENGDE = 12;

function FormikInput ({name, intl}) {

    const validate = (value: string): string| undefined => {
        let error: undefined| string;
        if(!value){
            error = intl.formatMessage({
                id: 'legg-til.arbeidsliste-form.feilmelding.overskrift.tekst.mangler'
            });
        }else if(value.length > OVERSKRIFT_MAKS_LENGDE) {
            error = intl.formatMessage({
                    id: 'legg-til-arbeidsliste-form.feilmelding.overskrift-lengde'},
                {OVERSKRIFT_MAKS_LENGDE}
            );
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
                )
            }}
        </Field>
    )
}

export default injectIntl(FormikInput);
