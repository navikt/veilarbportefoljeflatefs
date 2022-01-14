import React from 'react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './modal.less';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

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
            <div className="veiledergruppe-feilet-modal__tekstgruppe">
                <Heading size="xlarge" level="1">
                    {props.innholdstittel}
                </Heading>
                <BodyShort>{props.tekst}</BodyShort>
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
