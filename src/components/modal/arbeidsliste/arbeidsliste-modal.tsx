import React, {useState} from 'react';
import {connect} from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import {skjulModal} from '../../../ducks/modal';
import {markerAlleBrukere} from '../../../ducks/portefolje';
import LeggTilArbeidslisteForm from './legg-til-arbeidslisteform';
import {BrukerModell, Status} from '../../../model-interfaces';
import './arbeidsliste.less';
import {AppState} from '../../../reducer';
import {STATUS} from '../../../ducks/utils';
import {LasterModal} from '../lastermodal/laster-modal';
import ModalHeader from '../modal-header/modal-header';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';

type Props = {
    isOpen: boolean;
    valgteBrukere: BrukerModell[];
    skjulArbeidslisteModal: () => void;
    fjernMarkerteBrukere: () => void;
    innloggetVeileder: string;
    arbeidslisteStatus?: Status;
};

const ArbeidslisteModal: React.FC<Props> = ({
    isOpen,
    valgteBrukere,
    skjulArbeidslisteModal,
    fjernMarkerteBrukere,
    innloggetVeileder,
    arbeidslisteStatus
}) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const [formIsDirty, setFormIsDirty] = useState<boolean>(false);
    const laster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;
    const brukereSomSkalFjernes = valgteBrukere.filter(bruker => bruker.arbeidsliste.arbeidslisteAktiv);

    console.log('hello');
    const lukkModal = () => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formIsDirty || window.confirm(dialogTekst)) {
            setOpen(false);
            fjernMarkerteBrukere();
            skjulArbeidslisteModal();
        }
    };

    return laster ? (
        <LasterModal />
    ) : brukereSomSkalFjernes.length > 0 ? (
        <VarselModal
            isOpen={open}
            onRequestClose={lukkModal}
            contentLabel="Fjern brukere fra arbeidsliste"
            type={VarselModalType.ADVARSEL}
            dataTestClass="modal_varsel_fjern-fra-arbeidsliste"
        >
            <div className="fjern-arbeidsliste">
                <div className="arbeidsliste-headertekst">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        Fjern fra arbeidsliste
                    </Innholdstittel>
                    <Normaltekst className="blokk-s">
                        {`Du har valgt å fjerne ${brukereSomSkalFjernes.length} ${
                            brukereSomSkalFjernes.length === 1 ? 'bruker' : 'brukere'
                        } fra arbeidslisten.`}
                    </Normaltekst>
                </div>
                <FjernFraArbeidslisteForm valgteBrukere={brukereSomSkalFjernes} lukkModal={lukkModal} />
            </div>
        </VarselModal>
    ) : (
        <NavFrontendModal
            className="arbeidsliste-modal legg-i-arbeidsliste"
            contentLabel="arbeidsliste"
            isOpen={open}
            onRequestClose={lukkModal}
            closeButton
        >
            <ModalHeader tittel="Legg i arbeidsliste" />
            <div className="modal-innhold">
                <LeggTilArbeidslisteForm
                    valgteBrukere={valgteBrukere}
                    lukkModal={lukkModal}
                    innloggetVeileder={innloggetVeileder}
                    setFormIsDirty={setFormIsDirty}
                />
            </div>
        </NavFrontendModal>
    );
};

const mapStateToProps = (state: AppState) => ({
    innloggetVeileder: state.innloggetVeileder.data!.ident,
    arbeidslisteStatus: state.arbeidsliste.status
});

const mapDispatchToProps = dispatch => ({
    skjulArbeidslisteModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidslisteModal);
