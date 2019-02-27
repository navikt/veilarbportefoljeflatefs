import React from 'react';
import {Field, getIn} from "formik";
import Datovelger from "nav-datovelger/dist/datovelger/Datovelger";
import SkjemaelementFeilmelding from "nav-frontend-skjema/lib/skjemaelement-feilmelding";
import {validerDatoFeldt} from '../../utils/dato-utils';
import classNames from 'classnames';

function FormikDatoVelger({name}) {
    return (
        <Field
            validate={(value: Date)=> validerDatoFeldt(value, new Date(), true)}
            name={name}
            id={name}
        >
            {({ field, form: {touched, errors, setFieldValue}}) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames( 'skjemaelement', 'datovelger', { 'datovelger--harFeil': error });
                return(
                    <div className={datePickerClassName}>
                        <label className="skjemaelement__label">
                            Frist
                        </label>
                        <Datovelger
                            input={{
                                id: 'fristInput',
                                name: 'frist',
                                placeholder: 'dd.mm.åååå',
                                ariaLabel: 'Frist:'
                            }}
                            id="fristDatovelger"
                            onChange={(date: Date) => setFieldValue(field.name, date)}
                            dato={field.value}
                            dayPickerProps={{className : "datovelger__DayPicker"}}
                        />
                        <SkjemaelementFeilmelding feil={error ? {feilmelding: error}: undefined}/>
                    </div>
                )
            }}
        </Field>
    )
}


export default FormikDatoVelger;
