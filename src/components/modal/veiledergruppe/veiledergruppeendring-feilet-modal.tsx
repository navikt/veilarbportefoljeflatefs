import React from 'react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './veiledergruppe-modal.css';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

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
        <VarselModal
            isOpen={isOpen}
            onClose={onRequestClose}
            className="veiledergruppe-feilet-modal"
            type={VarselModalType.FEIL}
        >
            <div className="veiledergruppe-feilet-modal__tekstgruppe">
                <Heading size="large" level="1">
                    {innholdstittel}
                </Heading>
                <BodyShort size="small">{tekst}</BodyShort>
            </div>
            <div className="veiledergruppe-feilet-modal__knappegruppe">
                <Button size="small" type="submit" onClick={onRequestClose}>
                    Ok
                </Button>
            </div>
        </VarselModal>
    );
}

export default VeiledergruppeendringFeiletModal;
