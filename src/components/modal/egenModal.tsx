import React from 'react';
import './modal.css';
import {Heading, Modal} from '@navikt/ds-react';

interface ModalProps {
    children: React.ReactNode;
    className?: string;
    open?: boolean;
    onClose: () => void;
    tittel?: string;
    modalWidth?: 'small' | 'medium';
}

export function EgenModal({children, className, open = true, onClose, tittel, modalWidth}: ModalProps) {
    return (
        <Modal className={className} open={open} onClose={onClose} width={modalWidth}>
            <Modal.Header data-testid="egenmodal_header">
                <Heading size="medium" level="1" className={className}>
                    {tittel}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-innhold">{children}</div>
            </Modal.Body>
        </Modal>
    );
}

export default EgenModal;
