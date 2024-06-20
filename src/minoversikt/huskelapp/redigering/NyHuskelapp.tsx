import React from 'react';
import {Form, Formik} from 'formik';
import {BodyShort, Heading} from '@navikt/ds-react';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import {HuskelappModell} from '../../../model-interfaces';

interface Props {
    huskelapp?: HuskelappModell;
    onSubmit: (values, formikHelpers) => Promise<any>;
    harArbeidsliste: boolean;
}

const endretAv = huskelapp => {
    return huskelapp?.endretAv ? `${huskelapp.endretAv}` : 'Feil i baksystem, Endret av mangler';
};

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
                    <BodyShort>{`Sist endret av: ${endretAv(huskelapp)}`}</BodyShort>
                </Form>
            </Formik>
            <HuskelappInfoAlert />
        </div>
    );
};
