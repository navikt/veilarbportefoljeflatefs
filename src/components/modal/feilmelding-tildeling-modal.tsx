import * as React from 'react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.less';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    fnrSuksess: Fnr[];
    onClose: () => void;
}

function FeilmeldingTildelingModal(props: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            isOpen={props.isOpen}
            onClose={props.onClose}
            type={VarselModalType.FEIL}
            portalClassName="tildeling-veileder-modal"
            className="tildeling-veileder-modal__content"
        >
            <Heading size="xlarge" level="1">
                Handling kan ikke utføres
            </Heading>
            <BodyShort>Tildeling av veileder til følgende bruker(e) feilet:</BodyShort>
            <FnrList listeMedFnr={props.fnrFeil} />
            <BodyShort>
                Det kan skyldes manglende tilgang til bruker, at veilederen allerede er tildelt brukeren, eller at
                brukeren ikke er under oppfølging.
            </BodyShort>

            {props.fnrSuksess?.length > 0 && (
                <div className="tildeling-veileder-modal__vellykkedebrukere">
                    <BodyShort>Tildeling av veileder lyktes for følgende bruker(e):</BodyShort>
                    <FnrList listeMedFnr={props.fnrSuksess} />
                    <BodyShort>Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder.</BodyShort>
                </div>
            )}
            <Button variant="secondary" onClick={props.onClose}>
                Lukk
            </Button>
        </VarselModal>
    );
}

export default FeilmeldingTildelingModal;
