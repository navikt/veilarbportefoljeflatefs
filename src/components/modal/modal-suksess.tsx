import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { PropsWithChildren } from 'react';

interface ModalSuksessProps {
    isOpen: boolean;
    onRequestClose: () => void;
    tittel: string;
    tekst: string;
}

export function ModalSuksess(props: PropsWithChildren<ModalSuksessProps>) {
    return (
        <VarselModal
            contentLabel="Tildeling av veileder vellykket"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            portalClassName="tildeling-veileder-modal"
            className="feiletbrukere-modal__content"
            type={VarselModalType.SUKSESS}
        >
            <div className="blokk-s oppretting-feilet-modal__tekstgruppe">
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
                Ok
            </Hovedknapp>
        </VarselModal>
    );
}
