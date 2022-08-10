import React, {useState} from 'react';
import './laster-modal.css';
import {Loader, Modal} from '@navikt/ds-react';

interface LasterModalProps {
    isOpen: boolean;
}

const LasterModal = ({isOpen}: LasterModalProps) => {
    const [isOpenLoaderModal, setIsOpenLoaderModal] = useState<boolean>(isOpen);
    return (
        <Modal
            open={isOpenLoaderModal}
            onClose={() => setIsOpenLoaderModal(false)}
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            className="veilarbportefoljeflatefs-laster-modal"
        >
            <Loader size="2xlarge" />
        </Modal>
    );
};

export default LasterModal;
