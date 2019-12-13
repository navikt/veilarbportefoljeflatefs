import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import {Fnr, FnrList} from "../fnr-list";

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    fnrSuksess: Fnr[];
    onClose: () => void;
}

function FeilmeldingTildelningModal(props: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            contentLabel="Modal tilordning feilet"
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            closeButton={false}
            type={VarselModalType.FEIL}
            portalClassName="feiletbrukere-modal"
            className="feiletbrukere-modal__content"
        >
            <Undertittel tag="h1" className="blokk-xxs">
                Handling kan ikke utføres
            </Undertittel>
            <Normaltekst className="blokk-s">
                Tildeling av veileder til følgende bruker feilet:
            </Normaltekst>
            <FnrList listeMedFnr={props.fnrFeil} />
            <Normaltekst className="blokk-s">
                Det kan skyldes manglende tilgang på bruker, eller at veilederen allerede er tildelt brukeren.
            </Normaltekst>
            {props.fnrSuksess.length > 0 &&
            <>
                <Undertittel tag="h1" className="blokk-xxs">
                    Handling utført
                </Undertittel>

                <FnrList listeMedFnr={props.fnrSuksess} />
                <Normaltekst className="blokk-s">
                    Det kan skyldes manglende tilgang på bruker, eller at veilederen allerede er tildelt brukeren.
                </Normaltekst>

            </>

            }
            <button className="knapp knapp--hoved" onClick={props.onClose}>
                Ok
            </button>
        </VarselModal>
    );
}

export default FeilmeldingTildelningModal;
