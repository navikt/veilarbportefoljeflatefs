import React from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { AdvarselModal } from '../../components/advarselmodal/advarsel-modal';
import hiddenIf from '../../components/hidden-if/hidden-if';

interface SletteVeiledergruppeModal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
}

function SletteVeiledergruppeModal(props: SletteVeiledergruppeModal) {
    return (
        <AdvarselModal
            contentLabel="Slette veiledergruppe"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="slette-veiledergruppe-modal"
        >
            <div className="blokk-s slette-veiledergruppe-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    Slett gruppe
                </Innholdstittel>
                <Normaltekst>
                    Gruppen vil bli slettet for alle på enheten.
                </Normaltekst>
                <Normaltekst>
                    Er du sikker på at du vil slette gruppen?
                </Normaltekst>
            </div>
            <div className="slette-veiledergruppe-modal__knappegruppe">
                <Hovedknapp
                    htmlType="submit"
                    onClick={() => {
                        props.onSubmit();
                    }}
                >
                    Slett
                </Hovedknapp>
                <Flatknapp
                    htmlType="button"
                    onClick={props.onRequestClose}
                >
                    Avbryt
                </Flatknapp>
            </div>
        </AdvarselModal>
    );
}

export default hiddenIf(SletteVeiledergruppeModal);
