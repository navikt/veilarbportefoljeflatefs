import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import React from 'react';
import {HuskelappModell} from '../../../model-interfaces';
import {Heading} from '@navikt/ds-react';

interface Props {
    huskelapp?: HuskelappModell;
    onSubmit: (values, formikHelpers) => Promise<any>;
    harArbeidsliste: boolean;
}

export const NyHuskelapp = ({huskelapp, onSubmit, harArbeidsliste}: Props) => {
    return (
        <div className="ny-huskelapp huskelapp__postit">
            {harArbeidsliste && <Heading size="small">Ny huskelapp</Heading>}
            <Formik
                initialValues={{
                    frist: huskelapp?.frist ?? '',
                    kommentar: huskelapp?.kommentar ?? ''
                }}
                validateOnBlur={false}
                onSubmit={onSubmit}
            >
                <Form id="rediger-huskelapp-skjema" className="ny-huskelapp-form">
                    <FormikTekstArea label="Tekst" name="kommentar" maxLengde={100} />
                    <FormikDatoVelger name="frist" />
                </Form>
            </Formik>
            <HuskelappInfoAlert />
        </div>
    );
};
