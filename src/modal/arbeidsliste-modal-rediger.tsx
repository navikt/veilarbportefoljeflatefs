import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import RedigerArbeidslisteForm from './rediger-arbeidsliste-form';
import { BrukerModell, Status } from '../model-interfaces';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import { STATUS } from '../ducks/utils';
import { visServerfeilModal } from '../ducks/modal-serverfeil';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { redigerArbeidsliste } from '../ducks/arbeidsliste';
import moment from 'moment';

NavFrontendModal.setAppElement('#applikasjon');

interface Ownprops {
    bruker: BrukerModell;
    innloggetVeileder: string;
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

}

type ArbeidslisteModalRedigerProps = StateProps & Ownprops & DispatchProps;

function ArbeidslisteModalRediger({
  bruker,
  innloggetVeileder,
  arbeidslisteStatus,
  sistEndretAv,
  sistEndretDato,
  onSubmit
}: ArbeidslisteModalRedigerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const lukkModalConfirm = (formikProps: FormikProps<FormikPropsValues>)=> {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || confirm(dialogTekst)) {
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
            moment(bruker.arbeidsliste.frist).format('YYYY-MM-DD') : ''
    };

    return (
        <>
            <button
                className="lenke lenke--frittstående arbeidsliste--rediger-lenke"
                onClick={()=>setIsOpen(true)}
            >
                <FormattedMessage id="arbeidsliste.kommentar.footer.knapp"/>
            </button>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    setIsOpen(false);
                    onSubmit(values);
                }}
                render={(formikProps)=> (
                    <NavFrontendModal
                        className="arbeidsliste-modal"
                        contentLabel="arbeidsliste"
                        isOpen={isOpen}
                        onRequestClose={()=> lukkModalConfirm(formikProps)}
                        closeButton
                    >
                        <div className="modal-header-wrapper">
                            <header className="modal-header"/>
                        </div>
                        <div className="arbeidsliste__modal">
                            <div className="arbeidsliste-info-tekst">
                                <Innholdstittel tag="h1" className="blokk-xs">
                                    <FormattedMessage id="modal.rediger.arbeidsliste.tittel"/>
                                </Innholdstittel>
                            </div>
                            <RedigerArbeidslisteForm
                                laster={laster}
                                sistEndretDato={sistEndretDato}
                                sistEndretAv={sistEndretAv}
                                lukkModal={()=>lukkModal(formikProps)}
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
        sistEndretAv: { veilederId: innloggetVeileder },
        endringstidspunkt: new Date().toISOString()
    });

    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

const mapStateToProps= (state) => ({
    arbeidslisteStatus: state.arbeidsliste.status
});

const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (formData) => dispatch(redigerArbeidsliste(formData, props))
});

export default connect<StateProps,DispatchProps,Ownprops>(mapStateToProps, mapDispatchToProps)(ArbeidslisteModalRediger);
