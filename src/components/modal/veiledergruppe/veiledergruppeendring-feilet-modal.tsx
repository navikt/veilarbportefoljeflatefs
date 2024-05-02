import React from 'react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './veiledergruppe-modal.css';
import {BodyShort, Button} from '@navikt/ds-react';

interface VeiledergruppeendringFeiletProps {
    isOpen: boolean;
    onRequestClose: () => void;
    innholdstittel: string;
    tekst: string;
}

function VeiledergruppeendringFeiletModal({
    isOpen,
    onRequestClose,
    innholdstittel,
    tekst
}: VeiledergruppeendringFeiletProps) {
    return (
        <VarselModal overskrift={innholdstittel} isOpen={isOpen} onClose={onRequestClose} type={VarselModalType.FEIL}>
            <BodyShort size="small">{tekst}</BodyShort>
            <Button
                size="small"
                type="submit"
                onClick={onRequestClose}
                className="veiledergruppe-feilet-modal_ok-knapp"
            >
                Ok
            </Button>
        </VarselModal>
    );
}

export default VeiledergruppeendringFeiletModal;
