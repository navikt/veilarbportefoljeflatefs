import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import React, {PropsWithChildren} from 'react';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.css';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface ModalSuksessProps {
    isOpen: boolean;
    onRequestClose: () => void;
    tittel: string;
    tekst: string;
    hovedknappTekst: string;
    closeButton?: boolean;
    testNavn?: string;
}

function ModalSuksess(props: PropsWithChildren<ModalSuksessProps>) {
    return (
        <VarselModal
            isOpen={props.isOpen}
            onClose={props.onRequestClose}
            portalClassName="tildeling-veileder-modal"
            className="tildeling-veileder-modal__content"
            type={VarselModalType.SUKSESS}
        >
            <div className="tildeling-veileder-modal__tekstgruppe">
                <Heading size="large" level="1">
                    {props.tittel}
                </Heading>
                <BodyShort size="small">{props.tekst}</BodyShort>
                {props.children}
            </div>
            <Button
                size="small"
                type="submit"
                onClick={props.onRequestClose}
                data-testid={`modal-suksess_${props.testNavn}`}
            >
                {props.hovedknappTekst}
            </Button>
        </VarselModal>
    );
}

export function TildelingerOk(props: {isOpen: boolean; onRequestClose: () => void; fnr: Fnr[]}) {
    return (
        <ModalSuksess
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            tittel="Det tar litt tid å overføre informasjonen til oversikten"
            tekst="Følgende bruker(e) ble tildelt veileder:"
            closeButton={false}
            hovedknappTekst="Lukk"
            testNavn="tildel-veileder"
        >
            <FnrList listeMedFnr={props.fnr} />
        </ModalSuksess>
    );
}
