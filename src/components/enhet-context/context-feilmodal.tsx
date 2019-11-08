import React from 'react';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import {AdvarselModal} from "../advarselmodal/advarsel-modal";

interface ContextFeilmodalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ContextFeilmodal ({isOpen, onClose}: ContextFeilmodalProps) {
    return (
        <AdvarselModal
            isOpen={isOpen}
            onRequestClose={onClose}
            portalClassName="brukercontext-modal"
            className="brukercontext-modal__content"
            contentLabel="Bruker i kontekst feilet"
        >
            <Innholdstittel tag="h1" className="blokk-s">
                Bruker i kontekst feilet
            </Innholdstittel>
            <Normaltekst className="blokk-s">
                Kommunikasjon med tjenesten for bruker i kontekst feilet.
                Dette betyr at det er fare for at du kan ha forskjellige
                brukere i forskjellige flater/vinduer.
            </Normaltekst>
            <div className="blokk-s">
                <Hovedknapp className="ok-knapp" onClick={onClose}>
                    Ok
                </Hovedknapp>
            </div>
        </AdvarselModal>
    );
}

export default ContextFeilmodal;
