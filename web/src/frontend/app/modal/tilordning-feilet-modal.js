import React, { Component, PropTypes as PT } from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

const fnrsToList = (fnrs) => (<ul>{(fnrs.map((fnr) => <li key={fnr} className="fnr__listitem">{fnr}</li>))}</ul>);

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
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton={false}
            >
                <div className="tilordningfeilet__modal">
                    <div className="tilordningfeiletmelding blokk-m">
                        <div className="tilordningfeiletmelding__ikon blokk-xxs" />
                    </div>
                    <Undertittel tag="h1" className="blokk-xxs">
                        <IntlMessage id="modal.tilordning.feilet.tittel" />
                    </Undertittel>
                    <Normaltekst className="blokk-s">
                        <IntlMessage id="modal.tilordning.feilet.infotekst" />
                    </Normaltekst>
                    {fnrsToList(this.props.fnr)}
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                        <IntlMessage id="modal.tilordning.feilet.knapptekst" />
                    </button>
                </div>
            </Modal>
        );
    }
}

TilordningFeiletModal.propTypes = {
    isOpen: PT.bool,
    fnr: PT.arrayOf(PT.string).isRequired,
    clearFeilendeTilordninger: PT.func.isRequired
};

export default TilordningFeiletModal;
