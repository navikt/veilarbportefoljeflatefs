import React, { Component, PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import {
Innholdstittel,
Normaltekst
} from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

class TilordningFeiletModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: this.props.isOpen };

        this.lukkModal = this.lukkModal.bind(this);
    }

    lukkModal() {
        this.setState({ isOpen: false });
    }

    render() {
        const { fnr } = this.props;

        return (
        <Modal
            contentLabel="Modal tilordning feilet"
            isOpen={this.state.isOpen}
            onRequestClose={this.lukkModal}
            closeButton={false}
        >
            <Innholdstittel tag="h1" style={{paddingRight: '3rem'}}>
                <IntlMessage id="modal.tilordning.feilet.tittel"/>
            </Innholdstittel>
            <Normaltekst className="blokk-s">
                <IntlMessage id="modal.tilordning.feilet.infotekst" values={{fnr}}/>
            </Normaltekst>
            <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                <IntlMessage id="modal.tilordning.feilet.knapptekst"/>
            </button>
        </Modal>
    );
    }
}

TilordningFeiletModal.propTypes = {
    isOpen: PT.bool.isRequired,
    fnr: PT.string.isRequired
};

export default TilordningFeiletModal;
