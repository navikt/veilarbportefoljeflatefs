import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { skjulModal, VIS_ARBEIDSLISTE_MODAL } from '../../../ducks/modal';
import { markerAlleBrukere } from '../../../ducks/portefolje';
import LeggTilArbeidslisteForm from './legg-til-arbeidslisteform';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';
import { BrukerModell } from '../../../model-interfaces';
import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import './arbeidsliste.less';
import { AppState } from '../../../reducer';
import ModalHeader from '../modal-header';

interface ArbeidslisteModalProps {
    isOpen: boolean;
    valgteBrukere: BrukerModell[];
    skjulArbeidslisteModal: () => void;
    fjernMarkerteBrukere: () => void;
    innloggetVeileder: string;
}

interface ArbeidslisteModalState {
    formIsDirty: boolean;
    isOpen: boolean;
}

class ArbeidslisteModal extends Component<ArbeidslisteModalProps, ArbeidslisteModalState> {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen,
            formIsDirty: false

        };
        this.lukkModal = this.lukkModal.bind(this);
        this.setFormIsDirty = this.setFormIsDirty.bind(this);
    }

    componentWillReceiveProps(nextProps: ArbeidslisteModalProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({isOpen: nextProps.isOpen});
        }
    }

    setFormIsDirty(formIsDirty: boolean) {
        this.setState({...this.state, formIsDirty});
    }

    lukkModal() {
        const {skjulArbeidslisteModal, fjernMarkerteBrukere} = this.props;
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!this.state.formIsDirty || window.confirm(dialogTekst)) {
            this.setState({isOpen: false});
            fjernMarkerteBrukere();
            skjulArbeidslisteModal();
        }
    }

    leggTilModal(valgteBrukere: BrukerModell[]) {
        return (
            <NavFrontendModal
                className='arbeidsliste-modal'
                contentLabel="arbeidsliste"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="modal-innhold">
                    <ModalHeader tittel='Legg i arbeidsliste'/>
                    <div className="arbeidsliste__info-tekst">
                        <Normaltekst>
                            {`${valgteBrukere.length} ${valgteBrukere.length === 1 ? ' bruker' : 'brukere'} valgt.`}
                        </Normaltekst>
                    </div>
                    <LeggTilArbeidslisteForm
                        valgteBrukere={valgteBrukere}
                        lukkModal={this.lukkModal}
                        innloggetVeileder={this.props.innloggetVeileder}
                        setFormIsDirty={this.setFormIsDirty}
                    />
                </div>
            </NavFrontendModal>
        );
    }

    fjernFraModal(valgteBrukere) {
        const brukereSomSkalFjernes = valgteBrukere.filter((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);

        return (
            <VarselModal
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                contentLabel="Fjern brukere fra arbeidsliste"
                type={VarselModalType.ADVARSEL}
            >
                <div className="fjern-arbeidsliste">
                    <div className="arbeidsliste-headertekst">
                        <Innholdstittel tag="h1" className="blokk-xs">
                            Fjern fra arbeidsliste
                        </Innholdstittel>
                        <Normaltekst className="blokk-s">
                            {`Du har valgt å fjerne ${brukereSomSkalFjernes.length} ${brukereSomSkalFjernes.length === 1 ? 'bruker' : 'brukere'} fra arbeidslisten.`}
                        </Normaltekst>
                    </div>
                    <FjernFraArbeidslisteForm
                        valgteBrukere={brukereSomSkalFjernes}
                        lukkModal={this.lukkModal}
                    />
                </div>
            </VarselModal>
        );
    }

    render() {
        const {valgteBrukere} = this.props;
        const fjerne = valgteBrukere.some((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);
        return (
            fjerne ? this.fjernFraModal(valgteBrukere) : this.leggTilModal(valgteBrukere)
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    visModal: state.modal.modal === VIS_ARBEIDSLISTE_MODAL,
    innloggetVeileder: state.inloggetVeileder.data!.ident,
});

const mapDispatchToProps = (dispatch) => ({
    skjulArbeidslisteModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidslisteModal);
