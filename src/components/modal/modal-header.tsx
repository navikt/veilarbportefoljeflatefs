import React from 'react';
import {Heading, Modal} from '@navikt/ds-react';
import './modal.css';

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode;
}

function ModalHeader({className, tittel}: OwnProps) {
    return (
        <Modal.Header>
            <Heading size="large" level="1" className={className} data-testId="modal-header">
                {tittel}
            </Heading>
        </Modal.Header>
    );
}

export default ModalHeader;
