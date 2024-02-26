import React from 'react';
import {Button, Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import './huskelapp.css';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import {endreHuskelappAction, lagreHuskelappAction} from '../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../ducks/portefolje';
import {visServerfeilModal} from '../../ducks/modal-serverfeil';
import {leggTilStatustall} from '../../ducks/statustall-veileder';
import FormikTekstArea from '../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../components/formik/formik-datovelger/formik-datovelger';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const LagEllerEndreHuskelappModal = ({isModalOpen, onModalClose, huskelapp, bruker}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    return (
        <Modal className="LagEllerEndreHuskelappModal" open={isModalOpen} onClose={onModalClose}>
            <Modal.Content>
                <HuskelappModalHeader />
                <div>
                    <HuskelappInfoAlert />
                    <Formik
                        initialValues={{
                            frist: huskelapp?.frist ?? '',
                            kommentar: huskelapp?.kommentar ?? ''
                        }}
                        validateOnBlur={false}
                        onSubmit={(values, formikHelpers) => {
                            if (!values.frist && !values.kommentar) {
                                return formikHelpers.setErrors({
                                    frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                                    kommentar:
                                        'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
                                });
                            }

                            huskelapp?.huskelappId
                                ? dispatch(
                                      endreHuskelappAction({
                                          huskelappId: huskelapp.huskelappId!!,
                                          brukerFnr: bruker.fnr,
                                          enhetId: enhetId!!,
                                          frist: values.frist?.toString(), //TODO fikse her
                                          kommentar: values.kommentar
                                      })
                                  )
                                      .then(dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!)))
                                      .then(onModalClose)
                                      .catch(dispatch(visServerfeilModal()))
                                : dispatch(
                                      lagreHuskelappAction({
                                          brukerFnr: bruker.fnr,
                                          enhetId: enhetId!!,
                                          frist: values.frist?.toString(),
                                          kommentar: values.kommentar
                                      })
                                  )
                                      .then(dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!)))
                                      .then(dispatch(leggTilStatustall('mineHuskelapper', 1)))
                                      .then(onModalClose)
                                      .catch(dispatch(visServerfeilModal()));
                        }}
                    >
                        <Form>
                            <FormikTekstArea name="kommentar" maxLengde={100} className="blokk-xs" />
                            <FormikDatoVelger name="frist" />
                            <div className="huskelapp-handlingsknapper">
                                <Button variant="primary" size="small" type="submit">
                                    Lagre
                                </Button>
                                <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                                    Avbryt
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modal.Content>
        </Modal>
    );
};
