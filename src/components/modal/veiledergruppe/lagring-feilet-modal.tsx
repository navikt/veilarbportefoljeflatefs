import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../../varselmodal/varselmodal';

interface LagringFeiletProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

function LagringFeiletModal(props: LagringFeiletProps) {
    return (
        <VarselModal
            contentLabel="Lagring av veiledergruppe feilet"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="lagring-feilet-modal"
            type={VarselModalType.ADVARSEL}
        >
            <div className="blokk-s lagring-feilet-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    Lagring feilet
                </Innholdstittel>
                <Normaltekst>
                    Beklager, men gruppen kunne ikke lagres.
                </Normaltekst>

            </div>
            <div className="lagring-feilet-modal__knappegruppe">
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

export default LagringFeiletModal;
