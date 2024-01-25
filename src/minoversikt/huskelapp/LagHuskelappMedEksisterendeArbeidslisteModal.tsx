import React from 'react';
import {Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {ArbeidslisteModell, HuskelappModell} from '../../model-interfaces';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import './huskelapp.css';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../components/formik/formik-datovelger/formik-datovelger';
import {HuskelappFormFooter} from './HuskelappFormFooter';
interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp: HuskelappModell;
    arbeidsliste: ArbeidslisteModell;
}
export const LagHuskelappMedEksisterendeArbeidslisteModal = ({onModalClose, isModalOpen, arbeidsliste}: Props) => {
    return (
        <Modal className="lagHuskelappMedEksisterendeArbeidslisteModal" open={isModalOpen} onClose={onModalClose}>
            <Modal.Content>
                <HuskelappModalHeader />
                <div className="huskelapp-modal-content">
                    <div>
                        <HuskelappInfoAlert />
                        <Formik
                            initialValues={{
                                frist: '',
                                kommentar: ''
                            }}
                            onSubmit={() => {}}
                        >
                            <Form>
                                <FormikTekstArea name="kommentar" maxLengde={100} className="blokk-xs" />
                                <FormikDatoVelger name="frist" />
                            </Form>
                        </Formik>
                    </div>
                    <EksisterendeArbeidslisteVisning arbeidsliste={arbeidsliste} />
                </div>
                <HuskelappFormFooter onCancel={onModalClose} onSubmit={() => {}} />
            </Modal.Content>
        </Modal>
    );
};
