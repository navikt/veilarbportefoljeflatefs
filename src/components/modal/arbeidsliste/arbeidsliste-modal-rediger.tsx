import * as React from 'react';
import {useState} from 'react';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import {BrukerModell, KategoriModell} from '../../../model-interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikProps} from 'formik';
import {STATUS} from '../../../ducks/utils';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {markerAlleBrukere, oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';
import {redigerArbeidslisteAction} from '../../../ducks/arbeidsliste';
import moment from 'moment';
import {OrNothing} from '../../../utils/types/types';
import './arbeidsliste.css';
import {logEvent} from '../../../utils/frontend-logger';
import ModalHeader from '../modal-header';
import {skjulModal, VIS_FJERN_ARBEIDSLISTE_MODAL, visFjernArbeidslisteModal} from '../../../ducks/modal';
import {AppState} from '../../../reducer';
import FjernArbeidslisteModal from './fjern-fra-arbeidsliste-modal';
import {Button, Modal} from '@navikt/ds-react';
import LasterModal from '../lastermodal/laster-modal';
import {trackAmplitude} from '../../../amplitude/amplitude';

interface ArbeidslisteModalRedigerProps {
    bruker: BrukerModell;
    innloggetVeileder: OrNothing<string>;
    sistEndretDato: Date;
    sistEndretAv?: string;
    settMarkert: (fnr: string, markert: boolean) => void;
}

interface FormikPropsValues {
    kommentar: string;
    frist: string;
    overskrift: string;
    kategori: KategoriModell;
}

function ArbeidslisteModalRediger({
    bruker,
    sistEndretAv,
    sistEndretDato,
    settMarkert,
    innloggetVeileder
}: ArbeidslisteModalRedigerProps) {
    const arbeidslisteStatus = useSelector((state: AppState) => state.arbeidsliste.status);
    const statusLaster = arbeidslisteStatus !== undefined && arbeidslisteStatus === STATUS.PENDING;
    const [isOpen, setIsOpen] = useState(false);
    const portefolje = useSelector((state: AppState) => state.portefolje.data);
    const valgteBrukere = portefolje.brukere.filter(bruker => bruker.markert === true);
    const dispatch = useDispatch();
    const modalSkalVises = useSelector((state: AppState) => state.modal.modal) === VIS_FJERN_ARBEIDSLISTE_MODAL;

    const lukkModalConfirm = (formikProps: FormikProps<FormikPropsValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            setIsOpen(false);
            formikProps.resetForm();
        }
    };

    const lukkModal = formikProps => {
        setIsOpen(false);
        formikProps.resetForm();
    };

    const initialValues = {
        overskrift: bruker.arbeidsliste.overskrift || '',
        kommentar: bruker.arbeidsliste.kommentar || '',
        frist: bruker.arbeidsliste.frist ? moment(bruker.arbeidsliste.frist).format('YYYY-MM-DD') : '',
        kategori: bruker.arbeidsliste.kategori
    };

    const klikkRedigerknapp = () => {
        logEvent('portefolje.metrikker.arbeidsliste.rediger');
        dispatch(markerAlleBrukere(false));
        setIsOpen(true);
    };

    const lukkFjernModal = () => {
        settMarkert(bruker.fnr, true);
        dispatch(skjulModal());
    };

    return (
        <>
            <Button
                variant="tertiary"
                className="lenke lenke--frittstående arbeidsliste--rediger-lenke"
                onClick={klikkRedigerknapp}
                data-testid="min-oversikt_chevron-arbeidsliste_rediger-knapp"
                size="small"
            >
                Rediger
            </Button>
            {statusLaster ? (
                <LasterModal isOpen={statusLaster} />
            ) : (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={values => {
                        setIsOpen(false);
                        dispatch(
                            redigerArbeidslisteAction(values, {
                                bruker,
                                innloggetVeileder
                            })
                        );
                        trackAmplitude(
                            {
                                name: 'skjema fullført',
                                data: {
                                    skjemanavn: 'Rediger arbeidsliste',
                                    skjemaId: 'veilarbportefoljeflatefs-arbeidsliste'
                                }
                            },
                            {
                                kategori: values.kategori,
                                overskriftslengde: values.overskrift.length,
                                kommentarlengde: values.kommentar.length,
                                fristSatt: !!values.frist.length
                            }
                        );
                    }}
                >
                    {formikProps => (
                        <>
                            <Modal
                                className="arbeidsliste-modal"
                                open={isOpen}
                                onClose={() => lukkModalConfirm(formikProps)}
                            >
                                <Modal.Body>
                                    <ModalHeader tittel="Rediger arbeidsliste" />
                                    <div className="modal-innhold">
                                        <RedigerArbeidslisteForm
                                            sistEndretDato={sistEndretDato}
                                            sistEndretAv={sistEndretAv}
                                            lukkModal={() => lukkModal(formikProps)}
                                            bruker={bruker}
                                            fjernModal={() => dispatch(visFjernArbeidslisteModal())}
                                            settMarkert={() => settMarkert(bruker.fnr, !bruker.markert)}
                                        />
                                        {modalSkalVises && (
                                            <FjernArbeidslisteModal
                                                bruker={bruker}
                                                isOpen={modalSkalVises}
                                                valgteBrukere={valgteBrukere}
                                                lukkModal={() => lukkFjernModal()}
                                            />
                                        )}
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </>
                    )}
                </Formik>
            )}
        </>
    );
}

export function oppdaterArbeidsListeState(res, arbeidsliste, innloggetVeileder, fnr, dispatch) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }

    const arbeidslisteToDispatch = Array.of({
        ...arbeidsliste,
        fnr,
        sistEndretAv: {veilederId: innloggetVeileder},
        endringstidspunkt: new Date().toISOString()
    });

    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

export default ArbeidslisteModalRediger;
