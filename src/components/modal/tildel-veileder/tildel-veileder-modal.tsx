import { markerAlleBrukere } from '../../../ducks/portefolje';
import { skjulModal, VIS_TILDEL_VEILEDER_MODAL } from '../../../ducks/modal';
import React, { Component } from 'react';
import { AppState } from '../../../reducer';
import { connect } from 'react-redux';
import './tildel-veileder-modal.less';
import TildelVeileder from './tildel-veileder';
import Modal from '../modal';
import { BrukerModell } from '../../../model-interfaces';

interface TildelVeilederModalProps {
    isOpen: boolean;
    skjulTildelVeilederModal: () => void;
    fjernMarkerteBrukere: () => void;
    innloggetVeileder: string;
    valgteBrukere: BrukerModell[];
}

interface TildelVeilederModalState {
    formIsDirty: boolean;
    isOpen: boolean;
}

class TildelVeilederModal extends Component<TildelVeilederModalProps, TildelVeilederModalState> {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen,
            formIsDirty: false

        };
        this.lukkModal = this.lukkModal.bind(this);
        this.setFormIsDirty = this.setFormIsDirty.bind(this);
    }

    componentWillReceiveProps(nextProps: TildelVeilederModalProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({isOpen: nextProps.isOpen});
        }
    }

    setFormIsDirty(formIsDirty: boolean) {
        this.setState({...this.state, formIsDirty});
    }

    lukkModal() {
        const {skjulTildelVeilederModal, fjernMarkerteBrukere} = this.props;
        if (!this.state.formIsDirty || window.confirm()) {
            this.setState({isOpen: false});
            fjernMarkerteBrukere();
            skjulTildelVeilederModal();
        }
    }

    brukere(valgteBrukere: BrukerModell[]) {
        return valgteBrukere.filter((bruker) => bruker.arbeidsliste);
    }

    render() {
        return (
            <Modal
                className='tildel-veileder-modal'
                contentLabel="tildelveileder"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                tittel="Tildel veileder"
            >
                <TildelVeileder/>
            </Modal>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    visModal: state.modal.modal === VIS_TILDEL_VEILEDER_MODAL,
    innloggetVeileder: state.inloggetVeileder.data!.ident,
});

const mapDispatchToProps = (dispatch) => ({
    skjulTildelVeilederModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(TildelVeilederModal);
