import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
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
                        Bruker i kontekst feilet
                    </Innholdstittel>
                    <div className="modal-content modal-test">
                        <AlertStripeNavAnsatt className="blokk-s">
                            Kommunikasjon med tjenesten for bruker i kontekst feilet.
                            Dette betyr at det er fare for at du kan ha forskjellige brukere i forskjellige flater/vinduer.
                        </AlertStripeNavAnsatt>
                    </div>
                    <div className="modal-footer" >
                        <Hovedknapp onClick={this.props.onClose}>
                            Ok
                        </Hovedknapp>
                    </div>
                </div>
            </NavFrontendModal>
        );
    }
}

export default ContextFeilmodal;
