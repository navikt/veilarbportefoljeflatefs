import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './laster-modal.less';

export function LasterModal() {
    return (
        <ModalWrapper
            isOpen={true}
            contentLabel="Laster data"
            onRequestClose={() => {}} // tslint:disable-line:no-empty
            closeButton={false}
            portalClassName="veilarbvisittkortfs-laster-modal"
        >
            <NavFrontendSpinner type="XXL" />
        </ModalWrapper>
    );
}
