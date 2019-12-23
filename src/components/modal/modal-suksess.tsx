import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { PropsWithChildren } from 'react';
import { Fnr, FnrList } from '../fnr-list';

interface ModalSuksessProps {
    isOpen: boolean;
    onRequestClose: () => void;
    tittel: string;
    tekst: string;
    closeButton?: boolean;
    hovedknappTekst: string;
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
                <Innholdstittel className="blokk-s">
                    {props.tittel}
                </Innholdstittel>
                <Normaltekst>
                    {props.tekst}
                </Normaltekst>
                {props.children}

            </div>
            <Hovedknapp
                htmlType="submit"
                onClick={props.onRequestClose}
            >
                {props.hovedknappTekst}
            </Hovedknapp>
        </VarselModal>
    );
}

export function TildelingerOk(props: { isOpen: boolean, onRequestClose: () => void; fnr: Fnr[] }) {
    return (
        <ModalSuksess
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            tittel="Handling utført"
            tekst="Følgende bruker(e) ble tildelt veileder:"
            closeButton={false}
            hovedknappTekst="Lukk"
        >
            <>
                <FnrList listeMedFnr={props.fnr}/>
                <Normaltekst>Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder.</Normaltekst>
            </>
        </ModalSuksess>
    );
}
