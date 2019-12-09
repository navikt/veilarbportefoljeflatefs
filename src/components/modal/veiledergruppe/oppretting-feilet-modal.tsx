import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../../varselmodal/varselmodal';

interface OpprettingFeiletProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onAfterOpen: () => void;
}

function OpprettingFeiletModal(props: OpprettingFeiletProps) {
    return (
        <VarselModal
            contentLabel="Oppretting av veiledergruppe feilet"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="oppretting-feilet-modal"
            type={VarselModalType.ADVARSEL}
            onAfterOpen={props.onAfterOpen}
        >
            <div className="blokk-s oppretting-feilet-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    Oppretting av gruppe feilet
                </Innholdstittel>
                <Normaltekst>
                    Beklager, men gruppen kunne ikke opprettes.
                </Normaltekst>

            </div>
            <div className="oppretting-feilet-modal__knappegruppe">
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

export default OpprettingFeiletModal;
