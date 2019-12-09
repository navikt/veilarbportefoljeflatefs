import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './varsel-modal.less';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import { ReactComponent as SuksessSirkelIkon } from './ok-sirkel.svg';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import classNames from 'classnames';

export enum VarselModalType {
    ADVARSEL,
    SUKSESS,
    FEIL
}


interface VarselModalProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    closeTimeoutMS?: number;
    closeButton?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    className?: string;
    portalClassName?: string;
    type: VarselModalType
    onAfterOpen?: () => void;
}

export function VarselModal({type, contentLabel, isOpen, onRequestClose, children, closeTimeoutMS, closeButton, shouldCloseOnOverlayClick, className, portalClassName, onAfterOpen}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <ModalWrapper
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={closeTimeoutMS}
            closeButton={closeButton}
            portalClassName={classNames('varsel-modal', portalClassName)}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            onAfterOpen={onAfterOpen}
        >
            {getIkone(type)}
            <div className={classNames('varsel-modal__innhold', className)}>
                {children}
            </div>
        </ModalWrapper>
    );
}


function getIkone(varselModalType: VarselModalType) {
        switch (varselModalType) {
            case VarselModalType.ADVARSEL:
                return <AdvarselSirkelIkon/>;
            case VarselModalType.FEIL:
                return <FeilSirkelIkon/>;
            case VarselModalType.SUKSESS:
                return <SuksessSirkelIkon/>;
            default:
                return null;
    }
}
