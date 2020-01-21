import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../../varselmodal/varselmodal';
import './modal.less';

interface VeiledergruppeendringFeiletProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    innholdstittel: string;
    tekst: string;
}

function VeiledergruppeendringFeiletModal(props: VeiledergruppeendringFeiletProps) {
    return (
        <VarselModal
            contentLabel={props.contentLabel}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="veiledergruppe-feilet-modal"
            type={VarselModalType.ADVARSEL}
        >
            <div className="blokk-s veiledergruppe-feilet-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    {props.innholdstittel}
                </Innholdstittel>
                <Normaltekst>
                    {props.tekst}
                </Normaltekst>

            </div>
            <div className="veiledergruppe-feilet-modal__knappegruppe">
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

export default VeiledergruppeendringFeiletModal;
