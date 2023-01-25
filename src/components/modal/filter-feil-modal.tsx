import * as React from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.css';
import {useState} from 'react';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface FilterFeilModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

export default function FilterFeilModal(props: FilterFeilModalProps) {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    const lukkModal = () => {
        if (props.onClose) {
            props.onClose();
        }
        setIsOpen(false);
    };

    return (
        <VarselModal
            isOpen={isOpen}
            type={VarselModalType.FEIL}
            onClose={lukkModal}
            portalClassName="filter-feil-modal"
            className="filter-feil-modal__content"
        >
            <Heading size="small" level="1">
                Det oppstod en teknisk feil.
            </Heading>
            <BodyShort size="small">
                Det oppstod et problem med ett eller flere filter.
                <br />
                Prøv igjen senere.
            </BodyShort>
            <Button size="small" onClick={lukkModal}>
                Ok
            </Button>
        </VarselModal>
    );
}
