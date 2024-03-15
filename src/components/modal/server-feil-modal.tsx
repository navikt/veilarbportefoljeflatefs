import * as React from 'react';
import {useState} from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.css';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface ServerFeilModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServerFeilModal({isOpen, onClose}: ServerFeilModalProps) {
    const [erAapen, setErAapen] = useState(isOpen);

    const lukkModal = () => {
        onClose();
        setErAapen(false);
    };

    return (
        <VarselModal
            isOpen={erAapen}
            onClose={lukkModal}
            type={VarselModalType.FEIL}
            portalClassName="tildeling-veileder-modal"
        >
            <div className="server-feil-modal">
                <Heading size="small" level="1">
                    Handlingen kan ikke utføres
                </Heading>
                <BodyShort size="small">Noe gikk feil, prøv igjen senere.</BodyShort>
                <Button size="small" className="knapp knapp--hoved " onClick={lukkModal}>
                    Ok
                </Button>
            </div>
        </VarselModal>
    );
}
