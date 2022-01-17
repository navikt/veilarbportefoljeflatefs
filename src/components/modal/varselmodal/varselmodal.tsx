import React from 'react';
import classNames from 'classnames';
import './varsel-modal.less';
import {Error, Success, Warning} from '@navikt/ds-icons';
import {Modal} from '@navikt/ds-react';

export enum VarselModalType {
    ADVARSEL,
    SUKSESS,
    FEIL
}

interface VarselModalProps {
    isOpen: boolean;
    onClose: () => void;
    shouldCloseOnOverlayClick?: boolean;
    className?: string;
    portalClassName?: string;
    type: VarselModalType;
    dataTestClass?: string;
}

export function VarselModal({
    type,
    isOpen,
    onClose,
    children,
    shouldCloseOnOverlayClick,
    className,
    dataTestClass,
    portalClassName
}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={classNames('varsel-modal', portalClassName, dataTestClass)}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
            <div className={classNames('varsel-modal__innhold', className)}>
                <div className="varsel-modal__ikon">{getIkon(type)}</div>
                {children}
            </div>
        </Modal>
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
