import { VarselModal, VarselModalType } from '../varselmodal/varselmodal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';
import React, { Component } from 'react';
import { BrukerModell } from '../../../model-interfaces';

interface FjernFraArbeidslisteModalProps {
    isOpen: boolean;
    valgteBrukere: BrukerModell[];
    lukkModal: () => void;
    bruker: BrukerModell;
}

class FjernArbeidslisteModal extends Component<FjernFraArbeidslisteModalProps> {
    fjernFraModal(valgteBrukere) {
        const {isOpen, lukkModal, bruker} = this.props;
        const brukereSomSkalFjernes = valgteBrukere.filter((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);
        const navn = bruker.fornavn === '' && bruker.etternavn === '' ? 'en bruker' : `${bruker.fornavn} ${bruker.etternavn}`;

        return (
            <VarselModal
                isOpen={isOpen}
                onRequestClose={lukkModal}
                contentLabel="Fjern brukere fra arbeidsliste"
                type={VarselModalType.ADVARSEL}
            >
                <div className="fjern-arbeidsliste">
                    <div className="arbeidsliste-headertekst">
                        <Innholdstittel tag="h1" className="blokk-xs">
                            Fjern fra arbeidsliste
                        </Innholdstittel>
                        <Normaltekst className="blokk-s">
                            {`Du har valgt å fjerne ${navn} fra arbeidslisten.`}
                        </Normaltekst>
                    </div>
                    <FjernFraArbeidslisteForm
                        valgteBrukere={brukereSomSkalFjernes}
                        lukkModal={lukkModal}
                        visBrukerLabel={false}
                    />
                </div>
            </VarselModal>

        );
    }

    render() {
        const {valgteBrukere} = this.props;
        return (
            this.fjernFraModal(valgteBrukere)
        );
    }
}

export default FjernArbeidslisteModal;
