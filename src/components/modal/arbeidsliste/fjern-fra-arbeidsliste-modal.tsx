import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';
import React from 'react';
import {BrukerModell} from '../../../model-interfaces';
import {BodyShort, Heading} from '@navikt/ds-react';

interface FjernFraArbeidslisteModalProps {
    isOpen: boolean;
    valgteBrukere: BrukerModell[];
    lukkModal: () => void;
    bruker: BrukerModell;
}

function FjernArbeidslisteModal({isOpen, valgteBrukere, lukkModal, bruker}: FjernFraArbeidslisteModalProps) {
    const brukereSomSkalFjernes = valgteBrukere.filter(bruker => bruker.arbeidsliste.arbeidslisteAktiv);
    const navn =
        bruker.fornavn === '' && bruker.etternavn === '' ? 'en bruker' : `${bruker.fornavn} ${bruker.etternavn}`;

    return (
        <VarselModal
            isOpen={isOpen}
            onRequestClose={lukkModal}
            contentLabel="Fjern brukere fra arbeidsliste"
            type={VarselModalType.ADVARSEL}
            dataTestClass="modal_varsel_fjern-fra-arbeidsliste"
        >
            <div className="fjern-arbeidsliste">
                <div className="arbeidsliste-headertekst">
                    <Heading size="xlarge" level="1">
                        Fjern fra arbeidsliste
                    </Heading>
                    <BodyShort>{`Du har valgt å fjerne ${navn} fra arbeidslisten.`}</BodyShort>
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

export default FjernArbeidslisteModal;
