import React from 'react';
import ModalHeader from './modal-header';
import './modal.less';
import {Modal} from '@navikt/ds-react';

interface ModalProps {
    children: React.ReactNode;
    className?: string;
    open?: boolean;
    onClose: () => void;
    tittel?: string;
}

function EgenModal({children, className, open = true, onClose, tittel}: ModalProps) {
    return (
        <Modal className={className} open={open} onClose={onClose}>
            <ModalHeader tittel={tittel} />
            <div className="modal-innhold">{children}</div>
        </Modal>
    );
}

export default EgenModal;
