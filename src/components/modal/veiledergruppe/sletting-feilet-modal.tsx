import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../../varselmodal/varselmodal';

interface SlettingFeiletProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

function SlettingFeiletModal(props: SlettingFeiletProps) {
    return (
        <VarselModal
            contentLabel="Slette veiledergruppe"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="sletting-feilet-modal"
            type={VarselModalType.ADVARSEL}
        >
            <div className="blokk-s sletting-feilet-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    Sletting feilet
                </Innholdstittel>
                <Normaltekst>
                    Det skjedde en feil. Prøv igjen senere.
                </Normaltekst>

            </div>
            <div className="sletting-feilet-modal__knappegruppe">
                <Hovedknapp
                    htmlType="submit"
                    onClick={props.onRequestClose}
                >
                    Ok
                </Hovedknapp>
            </div>
        </VarselModal>
    );
}

export default SlettingFeiletModal;
