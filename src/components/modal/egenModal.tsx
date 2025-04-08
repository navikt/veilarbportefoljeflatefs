import {ReactNode} from 'react';
import {Heading, Modal} from '@navikt/ds-react';

interface ModalProps {
    children: ReactNode;
    className?: string;
    open?: boolean;
    onClose: () => void;
    tittel?: string;
    modalWidth?: 'small' | 'medium';
    testid?: string;
}

export function EgenModal({children, className, open = true, onClose, tittel, modalWidth, testid}: ModalProps) {
    return (
        <Modal
            className={className}
            open={open}
            onClose={onClose}
            closeOnBackdropClick={true}
            width={modalWidth}
            data-testid={testid}
            aria-labelledby="egenmodal-overskrift"
        >
            <Modal.Header data-testid="egenmodal_header">
                <Heading id="egenmodal-overskrift" size="medium" level="1" className={className}>
                    {tittel}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-innhold">{children}</div>
            </Modal.Body>
        </Modal>
    );
}
