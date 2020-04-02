import NavFrontendModal from 'nav-frontend-modal';
import React from 'react';
import classNames from 'classnames';
import ModalHeader from './modal-header';
import './modal.less';

const cls = (className: string | undefined) => classNames('modal', className);

interface ModalProps {
    children: React.ReactNode;
    className?: string;
    contentLabel: string;
    isOpen?: boolean;
    onRequestClose: () => void;
    tittel?: string;
}

function Modal({children, className, contentLabel, isOpen = true, onRequestClose, tittel}: ModalProps) {
    return (
        <NavFrontendModal
            className={cls(className)}
            contentLabel={contentLabel}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            portalClassName="veilarbportefoljeflatefs-modal"
            closeButton={true}
        >
            <ModalHeader tittel={tittel}/>
            <div className="modal-innhold">
                {children}
            </div>
        </NavFrontendModal>
    );
}

export default Modal;
