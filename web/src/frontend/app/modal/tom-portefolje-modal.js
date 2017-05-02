import React, { Component, PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

class TomPortefoljeModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: this.props.isOpen };

        this.lukkModal = this.lukkModal.bind(this);
    }

    lukkModal() {
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <Modal
                contentLabel="Enheten har ingen brukere"
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton={false}
            >
                <Innholdstittel tag="h1" style={{ paddingRight: '3rem' }}>
                    <IntlMessage id="modal.tittel" />
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    <IntlMessage id="modal.infotekst" />
                </Normaltekst>
                <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                    <IntlMessage id="modal.knapptekst" />
                </button>
            </Modal>
        );
    }
}

TomPortefoljeModal.propTypes = {
    isOpen: PT.bool.isRequired
};

export default TomPortefoljeModal;
