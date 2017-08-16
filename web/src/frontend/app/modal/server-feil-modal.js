import React, { Component, PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

class ServerFeilModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: this.props.isOpen };
        this.lukkModal = this.lukkModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({ isOpen: nextProps.isOpen });
        }
    }

    lukkModal() {
        const { onClose } = this.props;
        onClose();

        this.setState({ isOpen: false });
    }

    render() {
        return (
            <Modal
                contentLabel="Fikk feil fra server"
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton={false}
            >
                <div className="feiletbrukere__modal">
                    <div className="feiledbrukeremelding blokk-m">
                        <div className="feiledbrukeremelding__ikon blokk-xxs" />
                    </div>
                    <Undertittel tag="h1" className="blokk-xxs">
                        <IntlMessage id="modal.tittel" />
                    </Undertittel>
                    <Normaltekst className="blokk-s">
                        <IntlMessage id="modal.server.feil.infotekst" />
                    </Normaltekst>
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                        <IntlMessage id="modal.knapptekst" />
                    </button>
                </div>
            </Modal>
        );
    }
}

ServerFeilModal.propTypes = {
    isOpen: PT.bool.isRequired,
    onClose: PT.func.isRequired
};

export default ServerFeilModal;
