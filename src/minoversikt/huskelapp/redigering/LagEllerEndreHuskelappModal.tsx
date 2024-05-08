import React from 'react';
import classNames from 'classnames';
import {Button, Heading, Modal} from '@navikt/ds-react';
import {ArbeidslisteDataModell, ArbeidslisteModell, BrukerModell, HuskelappModell} from '../../../model-interfaces';
import '../huskelapp.css';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import FormikTekstArea from '../../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../../components/formik/formik-datovelger/formik-datovelger';
import {lagreHuskelapp} from './lagreHuskelapp';
import {endreHuskelapp} from './endreHuskelapp';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/huskelapp.svg';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp?: HuskelappModell;
    bruker: BrukerModell;
    arbeidsliste?: ArbeidslisteModell | null;
}

export const LagEllerEndreHuskelappModal = ({isModalOpen, onModalClose, huskelapp, bruker, arbeidsliste}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    return (
        <Modal
            className={classNames('lag-eller-endre-huskelapp-modal', {'med-eksisterende-arbeidsliste': !!arbeidsliste})}
            open={isModalOpen}
            onClose={onModalClose}
            closeOnBackdropClick={true}
        >
            <Modal.Header>
                <Heading size="medium" level="1" spacing className="huskelapp-modal__heading">
                    <HuskelappIkon aria-hidden={true} />
                    Huskelapp
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <div className="huskelapp-modal-content">
                    <div>
                        <HuskelappInfoAlert />
                        <Formik
                            initialValues={{
                                frist: huskelapp?.frist ?? '',
                                kommentar: huskelapp?.kommentar ?? ''
                            }}
                            validateOnBlur={false}
                            onSubmit={async (values, formikHelpers) => {
                                if (!values.frist && !values.kommentar) {
                                    return formikHelpers.setErrors({
                                        frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                                        kommentar:
                                            'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
                                    });
                                }
                                const arbeidslisteArray: ArbeidslisteDataModell[] = arbeidsliste
                                    ? [bruker].map(bruker => ({
                                          fnr: bruker.fnr,
                                          kommentar: bruker.arbeidsliste.kommentar ?? null,
                                          frist: bruker.arbeidsliste.frist,
                                          kategori: bruker.arbeidsliste.kategori
                                      }))
                                    : [];
                                try {
                                    if (huskelapp?.huskelappId) {
                                        await endreHuskelapp(
                                            dispatch,
                                            values,
                                            bruker,
                                            enhetId!!,
                                            onModalClose,
                                            huskelapp.huskelappId
                                        );
                                    } else {
                                        await lagreHuskelapp(
                                            dispatch,
                                            values,
                                            bruker,
                                            enhetId!!,
                                            onModalClose,
                                            arbeidslisteArray
                                        );
                                    }
                                } catch (error) {
                                    dispatch(visServerfeilModal());
                                }
                            }}
                        >
                            <Form id="lagEllerEndreHuskelappForm">
                                <FormikTekstArea name="kommentar" maxLengde={100} className="blokk-xs" />
                                <FormikDatoVelger name="frist" />
                            </Form>
                        </Formik>
                    </div>
                    {arbeidsliste && <EksisterendeArbeidslisteVisning arbeidsliste={arbeidsliste} />}
                </div>
                <div className="huskelapp-handlingsknapper">
                    <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                        Avbryt
                    </Button>
                    <Button variant="primary" size="small" type="submit" form="lagEllerEndreHuskelappForm">
                        {arbeidsliste ? 'Lagre og slett eksisterende' : 'Lagre'}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
