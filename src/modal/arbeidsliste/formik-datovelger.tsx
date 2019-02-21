import React from 'react';
import {Field} from "formik";
import Datovelger from "nav-datovelger/dist/datovelger/Datovelger";


function FormikDatoVelger({name, id}) {
    return (
        <Field name={name} id={id}>
            {({ field, form: {touched, errors, setFieldValue }}) => {
                console.log('field', field);
               return(
                   <Datovelger
                    input={{
                        id: 'fristInput',
                        name: 'frist',
                        placeholder: 'dd.mm.åååå',
                        ariaLabel: 'Frist:',
                        onChange: (value: string) => setFieldValue(field.name, new Date(value)),
                    }}
                    id="fristDatovelger"
                    onChange={(date: Date) => {
                        setFieldValue(field.name, date);
                    }}
                    locale="no"
                    dato={field.value}
                />
               )
            }}
        </Field>
    )
}


export default FormikDatoVelger;
