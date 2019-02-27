import React from 'react';
import {Field, FieldProps, getIn} from "formik";
import Datovelger from "nav-datovelger/dist/datovelger/Datovelger";
import SkjemaelementFeilmelding from "nav-frontend-skjema/lib/skjemaelement-feilmelding";
import {validerDatoFeldt} from '../../utils/dato-utils';
import classNames from 'classnames';

function FormikDatoVelger({name}) {
    return (
        <Field
            validate={(value: string) => validerDatoFeldt(value, new Date(), true)}
            name={name}
            id={name}
        >
            {({ field, form: {errors, setFieldValue}}: FieldProps) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames( 'skjemaelement', 'datovelger', { 'datovelger--harFeil': error });
                return(
                    <div className={datePickerClassName}>
                        <Datovelger
                            input={{
                                id: 'fristInput',
                                name: 'frist',
                                placeholder: 'dd.mm.åååå',
                                ariaLabel: 'Frist:',
                            }}
                            id="fristDatovelger"
                            onChange={(date: string) => setFieldValue(field.name, date)}
                            valgtDato={field.value}
                        />
                        <SkjemaelementFeilmelding feil={error ? {feilmelding: error}: undefined}/>
                    </div>
                )
            }}
        </Field>
    )
}


export default FormikDatoVelger;
