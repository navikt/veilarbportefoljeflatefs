import {BodyShort, Button, Heading} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.css';

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    fnrSuksess: Fnr[];
    onClose: () => void;
}

export function FeilmeldingTildelingModal({isOpen, fnrFeil, fnrSuksess, onClose}: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            overskrift="Handling kan ikke utføres"
            isOpen={isOpen}
            onClose={onClose}
            type={VarselModalType.FEIL}
            portalClassName="tildeling-veileder-modal"
        >
            <div className="tildeling-veileder-statusinfo">
                <Heading level="2" size="xsmall">
                    Tildeling av veileder til følgende bruker(e) feilet:
                </Heading>
                <FnrList listeMedFnr={fnrFeil} />
                <BodyShort size="small">
                    Det kan skyldes manglende tilgang til bruker, at veilederen allerede er tildelt brukeren, eller at
                    brukeren ikke er under oppfølging.
                </BodyShort>
            </div>

            {fnrSuksess?.length > 0 && (
                <div className="tildeling-veileder-statusinfo">
                    <Heading level="2" size="xsmall">
                        Tildeling av veileder lyktes for følgende bruker(e):
                    </Heading>
                    <FnrList listeMedFnr={fnrSuksess} />
                    <BodyShort size="small">
                        Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder.
                    </BodyShort>
                </div>
            )}
            <Button variant="secondary" size="small" onClick={onClose}>
                Lukk
            </Button>
        </VarselModal>
    );
}
