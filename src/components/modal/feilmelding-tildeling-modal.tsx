import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import { Fnr, FnrList } from '../fnr-list';

interface FeilmeldingBrukereModalProps {
    isOpen: boolean;
    fnrFeil: Fnr[];
    fnrSuksess: Fnr[];
    onClose: () => void;
}

function FeilmeldingTildelingModal(props: FeilmeldingBrukereModalProps) {
    return (
        <VarselModal
            contentLabel="Modal tildeling feilet"
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            closeButton={false}
            type={VarselModalType.FEIL}
            portalClassName="tildeling-veileder-modal"
            className="tildeling-veileder-modal__content"
        >
            <Undertittel tag="h1" className="blokk-xxs">
                Handling kan ikke utføres
            </Undertittel>
            <Normaltekst className="blokk-s">
                Tildeling av veileder til følgende bruker feilet:
            </Normaltekst>
            <FnrList listeMedFnr={props.fnrFeil}/>
            <Normaltekst className="blokk-s">
                Det kan skyldes manglende tilgang på bruker, eller at veilederen allerede er tildelt brukeren.
            </Normaltekst>
            {props.fnrSuksess && props.fnrSuksess.length > 0 &&

            <div className='tildeling-veileder-modal__vellykkedebrukere'>

                <Normaltekst className="blokk-s">
                    For de øvrige brukerne var tildeling av veileder vellykket:
                </Normaltekst>
                <FnrList listeMedFnr={props.fnrSuksess}/>
                <Normaltekst className="blokk-s">
                    Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder
                </Normaltekst>
            </div>
            }
            <button className="knapp knapp--hoved" onClick={props.onClose}>
                Lukk
            </button>
        </VarselModal>
    );
}

export default FeilmeldingTildelingModal;
