import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from './varselmodal/varselmodal';
import './feilmelding-brukere.less';

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

        this.state = {isOpen: this.props.isOpen || false};
        this.lukkModal = this.lukkModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({isOpen: nextProps.isOpen});
        }
    }

    lukkModal() {
        const {onClose} = this.props;
        onClose();

        this.setState({isOpen: false});
    }

    render() {
        return (
            <VarselModal
                contentLabel="Fikk feil fra server"
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton={false}
                type={VarselModalType.FEIL}
                portalClassName="tildeling-veileder-modal"
            >
                <div style={{margin: '1rem', textAlign: 'center'}}>
                    <Undertittel tag="h1" className="blokk-xxs">
                        Handlingen kan ikke utføres
                    </Undertittel>
                    <Normaltekst className="blokk-s">
                        Noe gikk feil, prøv igjen senere.
                    </Normaltekst>
                    <button className="knapp knapp--hoved blokk-s" onClick={this.lukkModal}>
                        Ok
                    </button>
                </div>
            </VarselModal>
        );
    }
}

export default ServerFeilModal;
