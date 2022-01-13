import React from 'react';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './modal.less';
import {Button} from '@navikt/ds-react';

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
                <Innholdstittel className="blokk-s">{props.innholdstittel}</Innholdstittel>
                <Normaltekst>{props.tekst}</Normaltekst>
            </div>
            <div className="veiledergruppe-feilet-modal__knappegruppe">
                <Button type="submit" onClick={props.onRequestClose}>
                    Ok
                </Button>
            </div>
        </VarselModal>
    );
}

export default VeiledergruppeendringFeiletModal;
