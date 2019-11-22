import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { AdvarselModal } from '../../components/advarselmodal/advarsel-modal';
import hiddenIf from '../../components/hidden-if/hidden-if';

interface EndringerIkkeLagretModal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
}

function EndringerIkkeLagretModal(props: EndringerIkkeLagretModal) {
    return (
        <AdvarselModal
            contentLabel="Endringene er ikke lagret"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="endringer-ikke-lagret-modal"
        >
            <div className="blokk-s endringer-ikke-lagret-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    Endringene er ikke lagret
                </Innholdstittel>
            </div>
            <div className="endringer-ikke-lagret-modal__knappegruppe">
                <Hovedknapp
                    htmlType="submit"
                    onClick={() => {
                        props.onRequestClose();
                    }}
                >
                    Avbryt uten å lagre
                </Hovedknapp>
                <Knapp
                    htmlType="button"
                    onClick={props.onRequestClose}
                >
                    Gå tilbake til redigering
                </Knapp>
            </div>
        </AdvarselModal>
    );
}

export default hiddenIf(EndringerIkkeLagretModal);
