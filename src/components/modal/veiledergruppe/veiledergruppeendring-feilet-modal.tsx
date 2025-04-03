import {BodyShort, Button} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './veiledergruppe-modal.css';

interface VeiledergruppeendringFeiletProps {
    isOpen: boolean;
    onRequestClose: () => void;
    innholdstittel: string;
    tekst: string;
}

export function VeiledergruppeendringFeiletModal({
    isOpen,
    onRequestClose,
    innholdstittel,
    tekst
}: VeiledergruppeendringFeiletProps) {
    return (
        <VarselModal overskrift={innholdstittel} isOpen={isOpen} onClose={onRequestClose} type={VarselModalType.FEIL}>
            <BodyShort size="small">{tekst}</BodyShort>
            <Button size="small" type="submit" onClick={onRequestClose}>
                Ok
            </Button>
        </VarselModal>
    );
}
