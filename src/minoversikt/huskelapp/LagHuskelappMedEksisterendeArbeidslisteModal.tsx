import React from 'react';
import {Button, Modal} from '@navikt/ds-react';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {ArbeidslisteDataModell, ArbeidslisteModell, BrukerModell} from '../../model-interfaces';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import './huskelapp.css';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../components/formik/formik-datovelger/formik-datovelger';
import {lagreHuskelappAction} from '../../ducks/huskelapp';
import {hentHuskelappForBruker} from '../../ducks/portefolje';
import {visServerfeilModal} from '../../ducks/modal-serverfeil';
import {leggTilStatustall} from '../../ducks/statustall-veileder';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {slettArbeidslisteAction} from '../../ducks/arbeidsliste';
import {oppdaterStateVedSlettArbeidsliste} from './slettEksisterendeArbeidsliste';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    arbeidsliste: ArbeidslisteModell;
    bruker: BrukerModell;
}

export const LagHuskelappMedEksisterendeArbeidslisteModal = ({
    onModalClose,
    isModalOpen,
    arbeidsliste,
    bruker
}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
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
                            onSubmit={(values, formikHelpers) => {
                                if (!values.frist && !values.kommentar) {
                                    return formikHelpers.setErrors({
                                        frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                                        kommentar:
                                            'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
                                    });
                                }

                                const arbeidsliste: ArbeidslisteDataModell[] = [bruker].map(bruker => ({
                                    fnr: bruker.fnr,
                                    kommentar: bruker.arbeidsliste.kommentar ?? null,
                                    frist: bruker.arbeidsliste.frist,
                                    kategori: bruker.arbeidsliste.kategori
                                }));

                                dispatch(
                                    lagreHuskelappAction({
                                        brukerFnr: bruker.fnr,
                                        enhetId: enhetId!!,
                                        frist: values.frist?.toString(),
                                        kommentar: values.kommentar
                                    })
                                )
                                    .then(dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!)))
                                    .then(dispatch(leggTilStatustall('mineHuskelapper', 1)))
                                    .then(dispatch(slettArbeidslisteAction(arbeidsliste)))
                                    .then(res => oppdaterStateVedSlettArbeidsliste(res, arbeidsliste, dispatch))
                                    .then(onModalClose)
                                    .catch(dispatch(visServerfeilModal()));
                            }}
                        >
                            <Form id="lagHuskelappSlettArbeidsliste">
                                <FormikTekstArea name="kommentar" maxLengde={100} className="blokk-xs" />
                                <FormikDatoVelger name="frist" />
                            </Form>
                        </Formik>
                    </div>
                    <EksisterendeArbeidslisteVisning arbeidsliste={arbeidsliste} />
                </div>
                <div className="huskelapp-handlingsknapper">
                    <Button variant="primary" size="small" type="submit" form="lagHuskelappSlettArbeidsliste">
                        Lagre og slett eksisterende
                    </Button>
                    <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                        Avbryt
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};
