import * as React from 'react';
import {useState} from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.css';
import {BodyShort, Button} from '@navikt/ds-react';

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
            overskrift="Handlingen kan ikke utføres"
            isOpen={erAapen}
            onClose={lukkModal}
            type={VarselModalType.FEIL}
        >
            <BodyShort size="small">Noe gikk feil, prøv igjen senere.</BodyShort>
            <Button variant="secondary" size="small" className="server-feil-modal__ok-knapp" onClick={lukkModal}>
                Ok
            </Button>
        </VarselModal>
    );
}
