import * as React from 'react';
import Modal from 'nav-frontend-modal';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import {IntlMessage} from '../utils/intl-utils';
import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {FormattedMessage} from "react-intl";

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

        this.state = {isOpen: this.props.isOpen};

        this.lukkModal = this.lukkModal.bind(this);
    }

    lukkModal() {
        this.setState({isOpen: false});
    }

    render() {
        return (
            <Modal
                className="tom-portefolje-modal"
                contentLabel="Enheten har ingen brukere"
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="modal-header-wrapper">
                    <header className="modal-header"/>
                </div>
                <div className="innhold">
                    <Innholdstittel className="blokk-s" tag="h1" style={{paddingRight: '3rem'}}>
                        <IntlMessage className="blokk-s" id="modal.tittel"/>
                    </Innholdstittel>
                    {/* TODO: Bytt til AlertStripeFeil når den er publisert*/}
                    <AlertStripeAdvarsel>
                        <FormattedMessage id="modal.infotekst" tagName="p"/>
                    </AlertStripeAdvarsel>
                </div>
                <div className="modal-footer">
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                        <IntlMessage id="modal.knapptekst"/>
                    </button>
                </div>
            </Modal>
        );
    }
}

export default TomPortefoljeModal;
