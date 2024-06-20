import React from 'react';
import {Form, Formik} from 'formik';
import './rediger-huskelapp.css';
import {Detail, Heading} from '@navikt/ds-react';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import {HuskelappModell} from '../../../model-interfaces';
import {toDatePrettyPrint} from '../../../utils/dato-utils';

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
                    <FormikTekstArea label="Tekst" name="kommentar" maxLengde={200} />
                    <FormikDatoVelger name="frist" />
                </Form>
            </Formik>
            {huskelapp && (
                <Detail>
                    <i>{`Endret ${toDatePrettyPrint(huskelapp?.endretDato)} av ${huskelapp?.endretAv}`}</i>
                </Detail>
            )}
            <HuskelappInfoAlert />
        </div>
    );
};
