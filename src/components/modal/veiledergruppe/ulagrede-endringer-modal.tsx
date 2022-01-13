import React from 'react';
import {Innholdstittel} from 'nav-frontend-typografi';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './modal.less';
import {Button} from '@navikt/ds-react';

interface EndringerIkkeLagretModal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
}

function EndringerIkkeLagretModal(props: EndringerIkkeLagretModal) {
    return (
        <VarselModal
            contentLabel="Endringene er ikke lagret"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="endringer-ikke-lagret-modal"
            type={VarselModalType.ADVARSEL}
        >
            <Innholdstittel className="blokk-s endringer-ikke-lagret-modal__innholdstittel">
                Endringene er ikke lagret
            </Innholdstittel>
            <div className="endringer-ikke-lagret-modal__knappegruppe">
                <Button
                    className="endringer-ikke-lagret-modal__knappegruppe__redigering"
                    type="button"
                    onClick={props.onRequestClose}
                >
                    Gå tilbake til redigering
                </Button>
                <Button
                    variant="danger"
                    className="endringer-ikke-lagret-modal__knappegruppe__avbryt"
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
