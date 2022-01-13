import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import React, {PropsWithChildren} from 'react';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.less';
import {Button} from '@navikt/ds-react';

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
            contentLabel="Tildeling av veileder vellykket"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            portalClassName="tildeling-veileder-modal"
            className="tildeling-veileder-modal__content"
            type={VarselModalType.SUKSESS}
            closeButton={props.closeButton}
        >
            <div className="blokk-s tildeling-veileder-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">{props.tittel}</Innholdstittel>
                <Normaltekst>{props.tekst}</Normaltekst>
                {props.children}
            </div>
            <Button type="submit" onClick={props.onRequestClose} data-testid={`modal-suksess_${props.testNavn}`}>
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
