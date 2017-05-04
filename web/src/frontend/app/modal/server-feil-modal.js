import React, { Component, PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
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
        const { clearTilordningFeil } = this.props;
        clearTilordningFeil();

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
                <Innholdstittel tag="h1" style={{ paddingRight: '3rem' }}>
                    <IntlMessage id="modal.tittel" />
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    <IntlMessage id="modal.server.feil.infotekst" />
                </Normaltekst>
                <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                    <IntlMessage id="modal.knapptekst" />
                </button>
            </Modal>
        );
    }
}

ServerFeilModal.propTypes = {
    isOpen: PT.bool.isRequired,
    clearTilordningFeil: PT.func.isRequired
};

export default ServerFeilModal;
