import {Button} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './veiledergruppe-modal.css';

interface EndringerIkkeLagretModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
}

export function EndringerIkkeLagretModal({isOpen, onRequestClose, onSubmit}: EndringerIkkeLagretModalProps) {
    return (
        <VarselModal
            overskrift="Endringene er ikke lagret"
            isOpen={isOpen}
            onClose={onRequestClose}
            className="endringer-ikke-lagret-modal__knappegruppe"
            type={VarselModalType.ADVARSEL}
        >
            <Button size="small" type="button" onClick={onRequestClose}>
                Gå tilbake til redigering
            </Button>
            <Button
                size="small"
                variant="danger"
                type="submit"
                onClick={() => {
                    onSubmit();
                }}
            >
                Lukk uten å lagre
            </Button>
        </VarselModal>
    );
}
