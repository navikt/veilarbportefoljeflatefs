import React from 'react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './veiledergruppe-modal.less';
import {Button, Heading} from '@navikt/ds-react';

interface EndringerIkkeLagretModal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
}

function EndringerIkkeLagretModal(props: EndringerIkkeLagretModal) {
    return (
        <VarselModal
            isOpen={props.isOpen}
            onClose={props.onRequestClose}
            className="endringer-ikke-lagret-modal"
            type={VarselModalType.ADVARSEL}
        >
            <Heading size="large" level="1" className="endringer-ikke-lagret-modal__innholdstittel">
                Endringene er ikke lagret
            </Heading>
            <div className="endringer-ikke-lagret-modal__knappegruppe">
                <Button type="button" onClick={props.onRequestClose}>
                    Gå tilbake til redigering
                </Button>
                <Button
                    variant="danger"
                    type="submit"
                    onClick={() => {
                        props.onSubmit();
                    }}
                >
                    Lukk uten å lagre
                </Button>
            </div>
        </VarselModal>
    );
}

export default EndringerIkkeLagretModal;
