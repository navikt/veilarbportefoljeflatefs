import React, { Component, PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

class TilordningFeiletModal extends Component {
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
        const { clearFeilendeTilordninger } = this.props;
        clearFeilendeTilordninger();

        this.setState({ isOpen: false });
    }

    render() {
        return (
            <Modal
                contentLabel="Modal tilordning feilet"
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton={false}
            >
                <Innholdstittel tag="h1" style={{ paddingRight: '3rem' }}>
                    <IntlMessage id="modal.tilordning.feilet.tittel" />
                </Innholdstittel>
                <Normaltekst className="blokk-s">
                    <IntlMessage id="modal.tilordning.feilet.infotekst" values={{ fnr: this.props.fnr }} />
                </Normaltekst>
                <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                    <IntlMessage id="modal.tilordning.feilet.knapptekst" />
                </button>
            </Modal>
        );
    }
}

TilordningFeiletModal.propTypes = {
    isOpen: PT.bool.isRequired,
    fnr: PT.string.isRequired,
    clearFeilendeTilordninger: PT.func.isRequired
};

export default TilordningFeiletModal;
