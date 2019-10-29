import React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import {ReactComponent as VeilederSvg} from './veileder.svg';

interface ContextFeilmodalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ContextFeilmodal ({isOpen, onClose}: ContextFeilmodalProps) {
    return (
        <NavFrontendModal
            contentLabel="ContextFeilmodal"
            shouldCloseOnOverlayClick={false}
            isOpen={isOpen}
            closeButton
            onRequestClose={onClose}
        >
            <div className="brukercontext__modal">
                <Innholdstittel tag="h1" className="blokk-s">
                    Bruker i kontekst feilet
                </Innholdstittel>
                <div className="modal-content modal-test">
                    <Veilederpanel
                        type="plakat"
                        svg={<VeilederSvg/>}
                        fargetema="feilmelding"
                    >
                        Kommunikasjon med tjenesten for bruker i kontekst feilet.
                        Dette betyr at det er fare for at du kan ha forskjellige brukere i forskjellige flater/vinduer.
                    </Veilederpanel>
                </div>
                <div className="modal-footer">
                    <Hovedknapp onClick={onClose}>
                        Ok
                    </Hovedknapp>
                </div>
            </div>
        </NavFrontendModal>
    );
}

export default ContextFeilmodal;
