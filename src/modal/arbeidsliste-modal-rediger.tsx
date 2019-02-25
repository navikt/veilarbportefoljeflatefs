import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import RedigerArbeidslisteForm from './arbeidsliste/rediger-arbeidsliste-form';
import { BrukerModell, Status } from '../model-interfaces';
import { useState } from 'react';
import { skjulModal } from '../ducks/modal';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { STATUS } from '../ducks/utils';
import { visServerfeilModal } from '../ducks/modal-serverfeil';
import { oppdaterArbeidslisteForBruker } from '../ducks/portefolje';
import { redigerArbeidsliste } from '../ducks/arbeidsliste';

NavFrontendModal.setAppElement('#applikasjon');

interface Ownprops {
    bruker: BrukerModell;
    innloggetVeileder: string;
    sistEndretDato: Date;
    sistEndretAv?: string;
}

interface DispatchProps {
    skjulArbeidslisteModal: () => void;
    onSubmit: (formdata: any) => void;
}

interface StateProps {
    arbeidslisteStatus: Status;
}

type ArbeidslisteModalRedigerProps = StateProps & Ownprops & DispatchProps;

function ArbeidslisteModalRediger({
  bruker,
  innloggetVeileder,
  arbeidslisteStatus,
  sistEndretAv,
  sistEndretDato,
  skjulArbeidslisteModal,
  onSubmit
}: ArbeidslisteModalRedigerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const lukkModal = (dirty: boolean)=> {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!dirty || confirm(dialogTekst)) {
            setIsOpen(false);
            skjulArbeidslisteModal();
        }
    };

    const laster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;


    const initialValues = {
        overskrift: bruker.arbeidsliste.overskrift || '',
        kommentar: bruker.arbeidsliste.kommentar || '',
        frist: new Date(bruker.arbeidsliste.frist) || null
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
                onSubmit={(values, actions) => {
                    onSubmit(values);
                    actions.resetForm();
                }}
                render={(formikProps)=> (
                    <NavFrontendModal
                        className="arbeidsliste-modal"
                        contentLabel="arbeidsliste"
                        isOpen={isOpen}
                        onRequestClose={()=> lukkModal(formikProps.dirty)}
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
                                lukkModal={()=>lukkModal(formikProps.dirty)}
                            />
                        </div>
                    </NavFrontendModal>)}
            />
        </>

    );
}
export function oppdaterArbeidsListeState(res, arbeidsliste, innloggetVeileder, fnr, lukkModal, dispatch) {
    console.log('fnr', fnr);

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
    skjulArbeidslisteModal: () => dispatch(skjulModal()),
    onSubmit: (formData) => dispatch(redigerArbeidsliste(formData, props))
});

export default connect<StateProps,DispatchProps,Ownprops>(mapStateToProps, mapDispatchToProps)(ArbeidslisteModalRediger);
