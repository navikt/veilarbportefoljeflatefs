import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './advarsel-modal.less';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import classNames from 'classnames';

interface VarselModalProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    closeTimeoutMS?: number;
    closeButton?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    className?: string;
}

export function AdvarselModal({contentLabel, isOpen, onRequestClose, children, closeTimeoutMS, closeButton, shouldCloseOnOverlayClick, className}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <ModalWrapper
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={closeTimeoutMS}
            closeButton={closeButton}
            portalClassName="advarsel-modal"
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
            <AdvarselSirkelIkon/>
            <div className={classNames('modal__innehold', className)}>
                {children}
            </div>
        </ModalWrapper>
    );
}
