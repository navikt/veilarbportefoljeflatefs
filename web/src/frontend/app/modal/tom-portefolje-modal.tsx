import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { injectIntl } from 'react-intl';

Modal.setAppElement('#applikasjon');

interface TomPortefoljeModalProps {
    isOpen: boolean;
    intl: any;
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
                className="tom-portefolje-modal"
                contentLabel={this.props.intl.formatMessage({ id: 'modal.feilmelding.tom.portefolje' })}
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="modal-header-wrapper">
                    <header className="modal-header"/>
                </div>
                <div className="innhold">
                    <Innholdstittel className="blokk-s" tag="h1" style={{fontWeight: 'bold'}}>
                        <IntlMessage id="modal.tittel"/>
                    </Innholdstittel>
                    <AlertStripeAdvarsel className="blokk-s">
                        <IntlMessage id="modal.infotekst"/>
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

export default injectIntl(TomPortefoljeModal);
