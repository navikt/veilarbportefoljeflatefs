import React from 'react';
import {Field, getIn} from "formik";
import Datovelger from "nav-datovelger/dist/datovelger/Datovelger";
import SkjemaelementFeilmelding from "nav-frontend-skjema/lib/skjemaelement-feilmelding";
import {validerDatoFeldt} from '../../utils/dato-utils';


function FormikDatoVelger({name}) {
    return (
        <Field
            validate={(value: Date)=> validerDatoFeldt(value, new Date(), true)}
            name={name}
            id={name}
        >
            {({ field, form: {touched, errors, setFieldValue}}) => {
                const error = getIn(errors, name);
                return(
                    <div className="datovelger skjemaelement">
                        <Datovelger
                            input={{
                                id: 'fristInput',
                                name: 'frist',
                                placeholder: 'dd.mm.åååå',
                                ariaLabel: 'Frist:',
                                onChange: (value: string) => setFieldValue(field.name, new Date(value)),
                            }}
                            id="fristDatovelger"
                            onChange={(date: Date) => setFieldValue(field.name, date)}
                            dato={field.value}
                        />
                        <SkjemaelementFeilmelding feil={error ? {feilmelding: error}: undefined}/>
                    </div>
                )
            }}
        </Field>
    )
}


export default FormikDatoVelger;
