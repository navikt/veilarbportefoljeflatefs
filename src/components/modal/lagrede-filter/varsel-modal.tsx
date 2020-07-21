import React from "react";
import {VarselModal, VarselModalType} from "../varselmodal/varselmodal";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import hiddenIf from "../../hidden-if/hidden-if";

export enum ErrorModalType {
    OPPDATERE,
    LAGRE,
    SLETTE
}

const errorModalTypeToTittel = new Map<ErrorModalType, string>([
    [ErrorModalType.LAGRE, 'Filteret kunne ikke opprettes'],
    [ErrorModalType.OPPDATERE, 'Filteret kunne ikke lagres'],
    [ErrorModalType.SLETTE, 'Filteret kunne ikke slettes']
]);

export function LagredeFilterVarselModal(props: { filterNavn: string, modalType: ErrorModalType, erApen: boolean, setErrorModalErApen}) {

    let HiddenIfNormalTekst = hiddenIf(Normaltekst);

    return (
        <VarselModal contentLabel={errorModalTypeToTittel.get(props.modalType)!}
                     onRequestClose={() => props.setErrorModalErApen(false)}
                     isOpen={props.erApen}
                     type={VarselModalType.FEIL}
                     closeButton={false}>

            <Innholdstittel>
                {errorModalTypeToTittel.get(props.modalType)}
            </Innholdstittel>
            <br/>
            <HiddenIfNormalTekst hidden={props.modalType !== ErrorModalType.LAGRE}>Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke opprettes. Prøv igjen
                senere.</HiddenIfNormalTekst>
            <HiddenIfNormalTekst hidden={props.modalType !== ErrorModalType.OPPDATERE}>Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke lagres. Prøv igjen senere.</HiddenIfNormalTekst>
            <HiddenIfNormalTekst hidden={props.modalType !== ErrorModalType.SLETTE}>Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke slettes. Prøv igjen
                senere.</HiddenIfNormalTekst>
            <Hovedknapp mini
                        className="error-knapp"
                        onClick={() => props.setErrorModalErApen(false)}>
                Lukk
            </Hovedknapp>
        </VarselModal>
    )

}