import React from "react";
import {VarselModal, VarselModalType} from "../varselmodal/varselmodal";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";

export enum ErrorModalType {
    OPPDATERE,
    LAGRE,
    SLETTE
}

export function LagredeFilterVarselModal(props: { filterNavn: string, modalType: ErrorModalType, erApen: boolean, setErrorModalErApen}) {

    const modalTittel = () => {
        if (props.modalType === ErrorModalType.LAGRE) return "Filteret kunne ikke opprettes"
        else if (props.modalType === ErrorModalType.OPPDATERE) return "Filteret kunne ikke lagres"
        else if (props.modalType === ErrorModalType.SLETTE) return "Filteret kunne ikke slettes"
        return ""
    }

    return (
        <VarselModal contentLabel={modalTittel()}
                     onRequestClose={() => props.setErrorModalErApen(false)}
                     isOpen={props.erApen}
                     type={VarselModalType.FEIL}
                     closeButton={false}>

            <Innholdstittel>
                {modalTittel}
            </Innholdstittel>
            <br/>
            {props.modalType === ErrorModalType.LAGRE &&
            <Normaltekst>Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke opprettes. Prøv igjen
                senere.</Normaltekst>}
            {props.modalType === ErrorModalType.OPPDATERE &&
            <Normaltekst>Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke lagres. Prøv igjen senere.</Normaltekst>}
            {props.modalType === ErrorModalType.SLETTE &&
            <Normaltekst>Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke slettes. Prøv igjen
                senere.</Normaltekst>}
            <Hovedknapp mini
                        className="error-knapp"
                        onClick={() => props.setErrorModalErApen(false)}>
                Lukk
            </Hovedknapp>
        </VarselModal>
    )

}