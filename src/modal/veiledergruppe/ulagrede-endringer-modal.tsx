import React from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AdvarselModal } from '../../components/advarselmodal/advarsel-modal';

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
            <Innholdstittel className="blokk-s endringer-ikke-lagret-modal__innholdstittel">
                Endringene er ikke lagret
            </Innholdstittel>
            <div className="endringer-ikke-lagret-modal__knappegruppe">
                <Hovedknapp
                    className="endringer-ikke-lagret-modal__knappegruppe__redigering"
                    mini
                    htmlType="button"
                    onClick={props.onRequestClose}
                >
                    Gå tilbake til redigering
                </Hovedknapp>
                <Flatknapp
                    className="endringer-ikke-lagret-modal__knappegruppe__avbryt"
                    mini
                    htmlType="submit"
                    onClick={() => {
                        props.onSubmit();
                    }}
                >
                    Avbryt uten å lagre
                </Flatknapp>
            </div>
        </AdvarselModal>
    );
}

export default EndringerIkkeLagretModal;
