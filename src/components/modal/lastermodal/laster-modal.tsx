import {useState} from 'react';
import {Loader, Modal} from '@navikt/ds-react';
import './laster-modal.css';

interface LasterModalProps {
    isOpen: boolean;
}

export const LasterModal = ({isOpen}: LasterModalProps) => {
    const [isOpenLoaderModal, setIsOpenLoaderModal] = useState<boolean>(isOpen);
    return (
        <Modal
            open={isOpenLoaderModal}
            onClose={() => setIsOpenLoaderModal(false)}
            className="veilarbportefoljeflatefs-laster-modal"
            data-testid="veilarbportefoljeflatefs-laster-modal"
            aria-label="Laster..."
        >
            <Loader size="2xlarge" />
        </Modal>
    );
};
