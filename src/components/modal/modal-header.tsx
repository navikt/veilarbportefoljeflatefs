import React from 'react';
import classNames from 'classnames';
import {Heading, Modal} from '@navikt/ds-react';
import './modal.css';

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode;
}

function ModalHeader({className, tittel}: OwnProps) {
    return (
        <Modal.Header>
            <Heading size="large" level="1" className={classNames('modal-header', className)}>
                {tittel}
            </Heading>
        </Modal.Header>
    );
}

export default ModalHeader;
