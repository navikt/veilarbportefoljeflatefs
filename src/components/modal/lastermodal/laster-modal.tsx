import React, {useState} from 'react';
import './laster-modal.less';
import {Modal} from '@navikt/ds-react';
import NavFrontendSpinner from 'nav-frontend-spinner';

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
            <NavFrontendSpinner />
        </Modal>
    );
};

export default LasterModal;
