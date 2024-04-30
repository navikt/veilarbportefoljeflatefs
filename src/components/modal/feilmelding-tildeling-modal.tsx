import * as React from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.css';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    fnrSuksess: Fnr[];
    onClose: () => void;
}

function FeilmeldingTildelingModal({isOpen, fnrFeil, fnrSuksess, onClose}: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            overskrift="Handling kan ikke utføres"
            isOpen={isOpen}
            onClose={onClose}
            type={VarselModalType.FEIL}
            portalClassName="tildeling-veileder-modal"
        >
            <BodyShort size="small">Tildeling av veileder til følgende bruker(e) feilet:</BodyShort>
            <FnrList listeMedFnr={fnrFeil} />
            <BodyShort size="small">
                Det kan skyldes manglende tilgang til bruker, at veilederen allerede er tildelt brukeren, eller at
                brukeren ikke er under oppfølging.
            </BodyShort>

            {fnrSuksess?.length > 0 && (
                <div className="tildeling-veileder-modal__vellykkedebrukere">
                    <BodyShort size="small">Tildeling av veileder lyktes for følgende bruker(e):</BodyShort>
                    <FnrList listeMedFnr={fnrSuksess} />
                    <BodyShort size="small">
                        Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder.
                    </BodyShort>
                </div>
            )}
            <Button
                variant="secondary"
                size="small"
                onClick={onClose}
                className="feilmelding-tildeling-modal__lukk-knapp"
            >
                Lukk
            </Button>
        </VarselModal>
    );
}

export default FeilmeldingTildelingModal;
