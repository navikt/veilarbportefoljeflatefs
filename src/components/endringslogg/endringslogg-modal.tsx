import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import './endringslogg.less';

interface EndringsloggModalProps {
    open: boolean;
}

export default function EndringsloggModal(props) {
    if(props.open) {
        return (
            <div className="endringslogg-modal">
                <Innholdstittel className="blokk-xxs tilbakemelding-modal__tittel">
                    Endringslogg
                </Innholdstittel>
                <Normaltekst className="tilbakemelding-modal__ingress">
                    Her ser du en oversikt over de siste endringene som er gjort!
                </Normaltekst>
            </div>
        );
    }
    return null;
}
