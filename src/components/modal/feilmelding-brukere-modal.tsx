import * as React from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.css';
import {BodyShort, Button} from '@navikt/ds-react';

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    onClose: () => void;
    tittelTekst: string;
    infotekstTekst: string;
}

function FeilmeldingBrukereModal({
    isOpen,
    fnrFeil,
    onClose,
    tittelTekst,
    infotekstTekst
}: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            overskrift={tittelTekst}
            isOpen={isOpen}
            onClose={onClose}
            type={VarselModalType.FEIL}
            portalClassName="arbeidsliste-modal"
            className="arbeidsliste-modal__content"
        >
            <BodyShort size="small">{infotekstTekst}</BodyShort>
            <FnrList listeMedFnr={fnrFeil} />
            <Button onClick={onClose} size="small">
                Ok
            </Button>
        </VarselModal>
    );
}

export default FeilmeldingBrukereModal;
