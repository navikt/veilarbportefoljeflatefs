import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

Modal.setAppElement('#applikasjon');

interface TomPortefoljeModalProps {
    isOpen: boolean;
}

interface TomPortefoljeModalState {
    isOpen: boolean;
}

class TomPortefoljeModal extends React.Component<TomPortefoljeModalProps, TomPortefoljeModalState> {
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

export default TomPortefoljeModal;
