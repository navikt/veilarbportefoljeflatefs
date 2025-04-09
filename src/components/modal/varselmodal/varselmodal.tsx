import {PropsWithChildren} from 'react';
import classNames from 'classnames';
import {Heading, Modal} from '@navikt/ds-react';
import {CheckmarkCircleFillIcon, ExclamationmarkTriangleFillIcon, XMarkOctagonFillIcon} from '@navikt/aksel-icons';
import './varsel-modal.css';

export enum VarselModalType {
    ADVARSEL,
    SUKSESS,
    FEIL
}

interface VarselModalProps {
    isOpen: boolean;
    onClose: () => void;
    overskrift: string;
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
}: PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={classNames('varsel-modal', portalClassName, dataTestClass)}
            closeOnBackdropClick={true}
            aria-labelledby="varselmodal-overskrift"
        >
            <Modal.Header className="varsel-modal__header">
                <div className="varsel-modal__ikon">{getIkon(type)}</div>
                <Heading id="varselmodal-overskrift" size="medium">
                    {overskrift}
                </Heading>
            </Modal.Header>
            <Modal.Body className={classNames('varsel-modal__innhold', className)}>{children}</Modal.Body>
        </Modal>
    );
}

function getIkon(varselModalType: VarselModalType) {
    switch (varselModalType) {
        case VarselModalType.ADVARSEL:
            return <ExclamationmarkTriangleFillIcon title="Advarsel" className="warning-icon" />;
        case VarselModalType.FEIL:
            return <XMarkOctagonFillIcon title="Feil" className="error-icon" />;
        case VarselModalType.SUKSESS:
            return <CheckmarkCircleFillIcon title="Suksess" className="success-icon" />;
        default:
            return null;
    }
}
