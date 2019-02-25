import React from 'react';
import {Field, getIn} from "formik";
import {Input} from "nav-frontend-skjema";


function FormikInput ({name}) {

    const validate = (value: string): string| undefined => {
        let error: undefined| string;
        if(!value){
           error ='Påkrevd overskrift!';
        }else if(value.length > 12) {
           error = 'Før langtttttt';
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
                        label="Overskrift"
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

export default FormikInput;
