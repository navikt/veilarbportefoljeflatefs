import {useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import './feilmelding-brukere.css';

interface FilterFeilModalProps {
    isOpen: boolean;
}

export function FilterFeilModal({isOpen}: FilterFeilModalProps) {
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
