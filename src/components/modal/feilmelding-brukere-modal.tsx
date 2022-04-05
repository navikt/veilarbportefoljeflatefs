import * as React from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.less';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    onClose: () => void;
    tittelTekst: string;
    infotekstTekst: string;
    merInfoTekst?: string;
}

function FeilmeldingBrukereModal(props: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            isOpen={props.isOpen}
            onClose={props.onClose}
            type={VarselModalType.FEIL}
            portalClassName="arbeidsliste-modal"
            className="arbeidsliste-modal__content"
        >
            <Heading size="small" level="1">
                {props.tittelTekst}
            </Heading>
            <BodyShort size="small">{props.infotekstTekst}</BodyShort>
            <FnrList listeMedFnr={props.fnrFeil} />
            <Button onClick={props.onClose}>Ok</Button>
        </VarselModal>
    );
}

export default FeilmeldingBrukereModal;
