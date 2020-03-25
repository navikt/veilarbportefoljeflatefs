import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import { BrukerModell, KategoriModell, Status } from '../../../model-interfaces';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import { STATUS } from '../../../ducks/utils';
import { visServerfeilModal } from '../../../ducks/modal-serverfeil';
import { oppdaterArbeidslisteForBruker } from '../../../ducks/portefolje';
import { redigerArbeidsliste } from '../../../ducks/arbeidsliste';
import moment from 'moment';
import { OrNothing } from '../../../utils/types/types';
import './arbeidsliste.less';
import { logEvent } from '../../../utils/frontend-logger';
import ModalHeader from '../modal-header';

interface Ownprops {
    bruker: BrukerModell;
    innloggetVeileder: OrNothing<string>;
    sistEndretDato: Date;
    sistEndretAv?: string;
}

interface DispatchProps {
    onSubmit: (formdata: any) => void;
}

interface StateProps {
    arbeidslisteStatus: Status;
}

interface FormikPropsValues {
    kommentar: string;
    frist: string | null;
    overskrift: string;
    kategori: KategoriModell | null
}

type ArbeidslisteModalRedigerProps = StateProps & Ownprops & DispatchProps;

function ArbeidslisteModalRediger({
                                      bruker,
                                      arbeidslisteStatus,
                                      sistEndretAv,
                                      sistEndretDato,
                                      onSubmit
                                  }: ArbeidslisteModalRedigerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const lukkModalConfirm = (formikProps: FormikProps<FormikPropsValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            setIsOpen(false);
            formikProps.resetForm();
        }
    };

    const lukkModal = (formikProps: FormikProps<FormikPropsValues>) => {
        setIsOpen(false);
        formikProps.resetForm();
    };

    const laster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;

    const initialValues = {
        overskrift: bruker.arbeidsliste.overskrift || '',
        kommentar: bruker.arbeidsliste.kommentar || '',
        frist: bruker.arbeidsliste.frist ?
            moment(bruker.arbeidsliste.frist).format('YYYY-MM-DD') : '',
        kategori: bruker.arbeidsliste.kategori
    };

    const klikkRedigerknapp = () => {
        logEvent('portefolje.metrikker.arbeidsliste.rediger');
        setIsOpen(true);
    };

    return (
        <>
            <button
                className="lenke lenke--frittstående arbeidsliste--rediger-lenke"
                onClick={klikkRedigerknapp}
            >
                Rediger
            </button>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    setIsOpen(false);
                    onSubmit(values);
                }}
                render={(formikProps) => (
                    <NavFrontendModal
                        className="arbeidsliste-modal"
                        contentLabel="arbeidsliste"
                        isOpen={isOpen}
                        onRequestClose={() => lukkModalConfirm(formikProps)}
                        closeButton
                    >
                        <div className="modal-innhold">
                            <ModalHeader tittel='Rediger arbeidsliste'/>
                            <RedigerArbeidslisteForm
                                laster={laster}
                                sistEndretDato={sistEndretDato}
                                sistEndretAv={sistEndretAv}
                                lukkModal={() => lukkModal(formikProps)}
                                bruker={bruker}
                            />
                        </div>
                    </NavFrontendModal>)}
            />
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

const mapStateToProps = (state) => ({
    arbeidslisteStatus: state.arbeidsliste.status
});

const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (formData) => dispatch(redigerArbeidsliste(formData, props))
});

export default connect<StateProps, DispatchProps, Ownprops>(mapStateToProps, mapDispatchToProps)(ArbeidslisteModalRediger);
