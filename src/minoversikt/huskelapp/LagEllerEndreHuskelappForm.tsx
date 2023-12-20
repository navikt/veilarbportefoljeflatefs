import React from 'react';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../components/formik/formik-datovelger/formik-datovelger';
import {Button} from '@navikt/ds-react';
import {HuskelappModell} from '../../model-interfaces';

interface Props {
    huskelapp: HuskelappModell;
    onModalClose: () => void;
}
export const LagEllerEndreHuskelappForm = ({huskelapp, onModalClose}: Props) => {
    return (
        <div>
            <HuskelappInfoAlert />
            <Formik
                initialValues={{
                    frist: huskelapp?.frist ?? '',
                    kommentar: huskelapp?.kommentar ?? ''
                }}
                onSubmit={() => {}}
            >
                <Form>
                    <FormikTekstArea name="kommentar" maxLengde={100} />
                    <FormikDatoVelger name="frist" />
                    <Button variant="primary" size="small">
                        Lagre
                    </Button>
                    <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                        Avbryt
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};
