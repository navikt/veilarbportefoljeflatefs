import * as React from 'react';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from './varselmodal/varselmodal';
import { Fnr, FnrList } from '../fnr-list';
import './feilmelding-brukere.less';

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
            <Innholdstittel tag="h1" className="blokk-xxs">
                Handling kan ikke utføres
            </Innholdstittel>
            <Normaltekst className="blokk-s">
                Tildeling av veileder til følgende bruker(e) feilet:
            </Normaltekst>
            <FnrList listeMedFnr={props.fnrFeil}/>
            <Normaltekst className="blokk-s">
                Det kan skyldes manglende tilgang på bruker(e), eller at veilederen allerede er tildelt brukeren(e).
            </Normaltekst>

            {props.fnrSuksess && props.fnrSuksess.length > 0 &&
            <div className='tildeling-veileder-modal__vellykkedebrukere'>
                <Normaltekst className="blokk-s">
                    Tildeling av veileder lyktes for følgende bruker(e):
                </Normaltekst>
                <FnrList listeMedFnr={props.fnrSuksess}/>
                <Normaltekst className="blokk-s">
                    Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder.
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
