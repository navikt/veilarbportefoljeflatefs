import * as React from 'react';
import {useState} from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.css';
import {BodyShort, Button} from '@navikt/ds-react';

interface FilterFeilModalProps {
    isOpen: boolean;
}

export default function FilterFeilModal({isOpen}: FilterFeilModalProps) {
    const [erAapen, setErAapen] = useState(isOpen);

    const lukkModal = () => {
        setErAapen(false);
    };

    return (
        <VarselModal
            overskrift="Det oppstod en teknisk feil"
            isOpen={erAapen}
            type={VarselModalType.FEIL}
            onClose={lukkModal}
            portalClassName="filter-feil-modal"
            className="filter-feil-modal__content"
        >
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
