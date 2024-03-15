import React from 'react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './veiledergruppe-modal.css';
import {Button, Heading} from '@navikt/ds-react';

interface EndringerIkkeLagretModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
}

function EndringerIkkeLagretModal({isOpen, onRequestClose, onSubmit}: EndringerIkkeLagretModalProps) {
    return (
        <VarselModal
            isOpen={isOpen}
            onClose={onRequestClose}
            className="endringer-ikke-lagret-modal"
            type={VarselModalType.ADVARSEL}
        >
            <Heading size="large" level="1" className="endringer-ikke-lagret-modal__innholdstittel">
                Endringene er ikke lagret
            </Heading>
            <div className="endringer-ikke-lagret-modal__knappegruppe">
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
            </div>
        </VarselModal>
    );
}

export default EndringerIkkeLagretModal;
