import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import { Fnr, FnrList } from "../fnr-list";

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    onClose: () => void;
    tittelTekst: string;
    infotekstTekst: string;
    merInfoTekst?: string;
}

function FeilmeldingBrukereModal (props: FeilmeldingBrukereModalProps){
    return (
        <VarselModal
            contentLabel="Modal tildeling feilet"
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            closeButton={false}
            type={VarselModalType.FEIL}
            portalClassName="feiletbrukere-modal"
            className="feiletbrukere-modal__content"
        >
            <Undertittel tag="h1" className="blokk-xxs">
                {props.tittelTekst}
            </Undertittel>
            <Normaltekst className="blokk-s">
                {props.infotekstTekst}
            </Normaltekst>
            <FnrList listeMedFnr={props.fnrFeil} />
            <button className="knapp knapp--hoved" onClick={props.onClose}>
                Ok
            </button>
        </VarselModal>
    );
}

export default FeilmeldingBrukereModal;
