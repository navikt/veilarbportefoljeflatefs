import React from 'react';
import {Form, Formik} from 'formik';
import {Heading} from '@navikt/ds-react';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import {HuskelappModell} from '../../../model-interfaces';
import {Promise} from 'cypress/types/cy-bluebird';

interface Props {
    huskelapp?: HuskelappModell;
    onSubmit: (values, formikHelpers) => Promise<any>;
    harArbeidsliste: boolean;
    setFormIsDirty?: (boolean) => void;
}

export const NyHuskelapp = ({huskelapp, onSubmit, harArbeidsliste, setFormIsDirty}: Props) => {
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
                {formikProps => {
                    // @ts-ignore
                    setFormIsDirty = formikProps.dirty;
                    // eslint-disable-next-line no-console
                    console.log('formikProps.dirty: ', formikProps.dirty);
                    return (
                        <Form id="rediger-huskelapp-skjema" className="ny-huskelapp-form">
                            <FormikTekstArea label="Tekst" name="kommentar" maxLengde={200} />
                            <FormikDatoVelger name="frist" />
                        </Form>
                    );
                }}
            </Formik>
            <HuskelappInfoAlert />
        </div>
    );
};
