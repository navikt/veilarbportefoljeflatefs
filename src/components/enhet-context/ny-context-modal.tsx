import * as React from 'react';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import Knapp, {Hovedknapp} from 'nav-frontend-knapper';
import {VarselModal, VarselModalType} from "../varselmodal/varselmodal";

interface NyContextModalProps {
    isOpen: boolean;
    isPending: boolean;
    doEndreAktivEnhet: () => void;
    doBeholdAktivEnhet: () => void;
    aktivEnhet: string;
}

function NyContextModal ({isOpen, isPending, doBeholdAktivEnhet, doEndreAktivEnhet, aktivEnhet}: NyContextModalProps) {
    return (
        <VarselModal
            contentLabel="Du har endret enhet advarsel"
            isOpen={isOpen}
            closeButton={false}
            onRequestClose={() => true}
            portalClassName="brukercontext-modal"
            className="brukercontext-modal__content"
            type={VarselModalType.ADVARSEL}
        >
            <Innholdstittel className="blokk-s">
                Du har endret enhet
            </Innholdstittel>
            <Normaltekst className="blokk-s">
                Du har endret enhet i et annet vindu. Du kan ikke jobbe i 2 enheter samtidig.
                Velger du 'endre' mister du arbeidet du ikke har lagret.
            </Normaltekst>
            <Normaltekst className="blokk-s">
                {`Ønsker du å endre enhet til ${aktivEnhet}?`}
            </Normaltekst>
            <div className="blokk-s knappe-rad">
                <Hovedknapp disabled={isPending} onClick={doEndreAktivEnhet}>
                    Endre
                </Hovedknapp>
                <Knapp onClick={doBeholdAktivEnhet} type="standard" spinner={isPending} autoDisableVedSpinner>
                    Behold
                </Knapp>
            </div>
        </VarselModal>
    );
}

export default NyContextModal;
