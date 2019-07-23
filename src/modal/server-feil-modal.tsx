import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

interface ServerFeilModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

interface ServerFeilModalState {
    isOpen: boolean;
}

class ServerFeilModal extends React.Component<ServerFeilModalProps, ServerFeilModalState> {
    constructor(props) {
        super(props);

        this.state = { isOpen: this.props.isOpen || false };
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
                        Handlingen kan ikke utføres
                    </Undertittel>
                    <Normaltekst className="blokk-s">
                        Noe gikk feil, prøv igjen senere.
                    </Normaltekst>
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                        Ok
                    </button>
                </div>
            </Modal>
        );
    }
}

export default ServerFeilModal;
