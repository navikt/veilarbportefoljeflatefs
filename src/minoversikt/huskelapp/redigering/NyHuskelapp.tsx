import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import React from 'react';
import {HuskelappModell} from '../../../model-interfaces';

interface Props {
    huskelapp?: HuskelappModell;
    onSubmit: (values, formikHelpers) => Promise<any>;
}

export const NyHuskelapp = ({huskelapp, onSubmit}: Props) => {
    return (
        <div className="rediger-huskelapp-skjema">
            <HuskelappInfoAlert />
            <Formik
                initialValues={{
                    frist: huskelapp?.frist ?? '',
                    kommentar: huskelapp?.kommentar ?? ''
                }}
                validateOnBlur={false}
                onSubmit={onSubmit}
            >
                <Form id="lagEllerEndreHuskelappForm">
                    <FormikTekstArea name="kommentar" maxLengde={100} className="blokk-xs" />
                    <FormikDatoVelger name="frist" />
                </Form>
            </Formik>
        </div>
    );
};
