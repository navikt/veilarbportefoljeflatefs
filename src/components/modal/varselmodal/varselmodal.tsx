import React from 'react';
import classNames from 'classnames';
import './varsel-modal.css';
import {ErrorFilled, SuccessFilled, WarningFilled} from '@navikt/ds-icons';
import {Heading, Modal} from '@navikt/ds-react';

export enum VarselModalType {
    ADVARSEL,
    SUKSESS,
    FEIL
}

interface VarselModalProps {
    isOpen: boolean;
    onClose: () => void;
    overskrift?: string;
    className?: string;
    portalClassName?: string;
    type: VarselModalType;
    dataTestClass?: string;
}

export function VarselModal({
    type,
    isOpen,
    onClose,
    overskrift,
    children,
    className,
    dataTestClass,
    portalClassName
}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={classNames('varsel-modal', portalClassName, dataTestClass)}
            closeOnBackdropClick={true}
        >
            {overskrift && ( // denne sjekken er berre medan eg migrerer ting
                <Modal.Header className="varsel-modal__header">
                    <div className="varsel-modal__ikon">{getIkon(type)}</div>
                    <Heading size="medium">{overskrift}</Heading>
                    {/*Til testing:*/}
                    {/*<Heading size="medium">*/}
                    {/*    {overskrift || "Overskrift :))"}*/}
                    {/*</Heading>*/}
                </Modal.Header>
            )}
            <Modal.Body>
                <div className={classNames('varsel-modal__innhold', className)}>
                    {!overskrift && <div className="varsel-modal__ikon">{getIkon(type)}</div>}
                    {children}
                </div>
            </Modal.Body>
        </Modal>
    );
}

function getIkon(varselModalType: VarselModalType) {
    switch (varselModalType) {
        case VarselModalType.ADVARSEL:
            return <WarningFilled className="warning-icon" />;
        case VarselModalType.FEIL:
            return <ErrorFilled className="error-icon" />;
        case VarselModalType.SUKSESS:
            return <SuccessFilled className="success-icon" />;
        default:
            return null;
    }
}
