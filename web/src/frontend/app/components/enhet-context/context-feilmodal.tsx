import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';

interface ContextFeilmodalProps {
    isOpen: boolean;
    onClose: () => void;
}

class ContextFeilmodal extends React.Component<ContextFeilmodalProps> {
    render() {
        return (
            <NavFrontendModal
                contentLabel="ContextFeilmodal"
                shouldCloseOnOverlayClick={false}
                isOpen={this.props.isOpen}
                closeButton
                onRequestClose={this.props.onClose}
            >
                <div className="brukercontext__modal">
                    <Innholdstittel tag="h1" className="blokk-s">
                        <FormattedMessage id="nyenhet.feilmodal.overskrift" />
                    </Innholdstittel>
                    <div className="modal-content modal-test">
                        <AlertStripeAdvarsel className="blokk-s">
                            <FormattedMessage id="nyenhet.feilmodal.tekst" />
                        </AlertStripeAdvarsel>
                    </div>
                    <div className="modal-footer" >
                        <Hovedknapp onClick={this.props.onClose}>
                            <FormattedMessage id="nyenhet.feilmodal.bekreft" />
                        </Hovedknapp>
                    </div>
                </div>
            </NavFrontendModal>
        );
    }
}

export default ContextFeilmodal;
