import React from 'react';
import {Button, Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../components/formik/formik-datovelger/formik-datovelger';
import {HuskelappModell} from '../../model-interfaces';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp: HuskelappModell;
}

export const LagEllerEndreHuskelappModal = ({isModalOpen, onModalClose, huskelapp}: Props) => (
    <Modal className="huskelapp-lag-eller-endre-modal" open={isModalOpen} onClose={onModalClose}>
        <Modal.Content>
            <HuskelappModalHeader />
            <HuskelappInfoAlert />
            <Formik
                initialValues={{
                    frist: huskelapp?.frist ?? '',
                    kommentar: huskelapp?.kommentar ?? ''
                }}
                onSubmit={() => {}}
            >
                <Form>
                    <FormikTekstArea name="kommentar" />
                    <FormikDatoVelger name="frist" />
                    <Button variant="primary" size="small">
                        Lagre
                    </Button>
                    <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                        Avbryt
                    </Button>
                </Form>
            </Formik>
        </Modal.Content>
    </Modal>
);
