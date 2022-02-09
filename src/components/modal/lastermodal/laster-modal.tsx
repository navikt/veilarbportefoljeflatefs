import React, {useState} from 'react';
import './laster-modal.less';
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
            <Loader size="xlarge" />
        </Modal>
    );
};

export default LasterModal;
