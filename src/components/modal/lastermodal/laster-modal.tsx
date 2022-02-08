import React from 'react';
import './laster-modal.less';
import {Loader, Modal} from '@navikt/ds-react';

export function LasterModal() {
    return (
        <Modal
            open
            onClose={() => {}}
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            className="veilarbportefoljeflatefs-laster-modal"
        >
            <Loader size="2xlarge" />
        </Modal>
    );
}
