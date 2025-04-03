import {useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.css';

interface ServerFeilModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ServerFeilModal({isOpen, onClose}: ServerFeilModalProps) {
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
            <Button variant="secondary" size="small" onClick={lukkModal}>
                Ok
            </Button>
        </VarselModal>
    );
}
