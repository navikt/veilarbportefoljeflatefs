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
            // shouldCloseOnOverlayClick={false} // TODO Designsystemoppdatering: skal ikkje ha overlay når dei andre får det i seinare v5-utgåve. 2024-04-12 Ingrid og Klara
            className="veilarbportefoljeflatefs-laster-modal"
        >
            <Loader size="2xlarge" />
        </Modal>
    );
};

export default LasterModal;
