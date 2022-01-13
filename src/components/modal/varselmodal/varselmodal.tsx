import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import classNames from 'classnames';
import './varsel-modal.less';
import {Error, Success, Warning} from '@navikt/ds-icons';

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
    type: VarselModalType;
    onAfterOpen?: () => void;
    dataTestClass?: string;
}

export function VarselModal({
    type,
    contentLabel,
    isOpen,
    onRequestClose,
    children,
    closeTimeoutMS,
    closeButton,
    shouldCloseOnOverlayClick,
    className,
    portalClassName,
    onAfterOpen,
    dataTestClass
}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <ModalWrapper
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={closeTimeoutMS}
            closeButton={closeButton}
            portalClassName={classNames('varsel-modal', portalClassName, dataTestClass)}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            onAfterOpen={onAfterOpen}
        >
            <div className="varsel-modal__ikon">{getIkon(type)}</div>
            <div className={classNames('varsel-modal__innhold', className)}>{children}</div>
        </ModalWrapper>
    );
}

function getIkon(varselModalType: VarselModalType) {
    switch (varselModalType) {
        case VarselModalType.ADVARSEL:
            return <Warning />;
        case VarselModalType.FEIL:
            return <Error />;
        case VarselModalType.SUKSESS:
            return <Success />;
        default:
            return null;
    }
}
