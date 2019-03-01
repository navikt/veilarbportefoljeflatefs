import React from 'react';
import {Textarea} from "nav-frontend-skjema";
import {Field,getIn} from "formik";
import {injectIntl} from 'react-intl'

const KOMMENTAR_MAKS_LENGDE = 500;

function FormikTekstArea({name, intl}) {

    const validate =  (value:string) => {
        let error: undefined| string;
        if(!value){
            error = intl.formatMessage({
                id: 'legg-til.arbeidsliste-form.feilmelding.tekst.mangler'
            });
        }else if(value.length > KOMMENTAR_MAKS_LENGDE) {
            error = intl.formatMessage({
                id: 'legg-til-arbeidsliste-form.feilmelding.kommentar-lengde'},
           {KOMMENTAR_MAKS_LENGDE}
                );
        }
        return error;
    };

    return (
        <Field validate={validate} name={name}>
            {({field, form}) =>{
                const touched = getIn(form.touched, name);
                const errors = getIn(form.errors, name);
                return (
                    <Textarea
                        id={name}
                        textareaClass="skjemaelement__input input--fullbredde arbeidslistekommentar"
                        label="Kommentar"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={field.value}
                        name={name}
                        feil ={errors && touched ? {feilmelding: errors} : undefined}
                        maxLength={500}
                    />)}}
        </Field>
    )
}

export default injectIntl(FormikTekstArea);
