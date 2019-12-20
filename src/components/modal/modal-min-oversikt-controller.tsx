import React from 'react';
import FeilmeldingBrukereModal from './feilmelding-brukere-modal';
import {
    FJERN_FRA_ARBEIDSLISTE_FEILET,
    LEGG_TIL_ARBEIDSLISTE_FEILET,
    TILDELING_FEILET
} from '../../ducks/modal-feilmelding-brukere';
import ServerFeilModal from './server-feil-modal';
import { VIS_TILDELING_SUKSESS_MODAL } from '../../ducks/modal';
import { useModalControllerSelector } from '../../hooks/redux/use-modal-controller.selector';
import { NY_FEILET_MODAL } from '../../ducks/modal-serverfeil';
import FeilmeldingTildelingModal from './feilmelding-tildeling-modal';
import { TildelingerOk } from './modal-suksess';
import { logEvent } from '../../utils/frontend-logger';
import { finnSideNavn } from '../../middleware/metrics-middleware';

export function MinOversiktModalController() {
    const {serverfeilModalSkalVises, feilmeldingModal, modal, closeServerfeilModal, closeFeilmeldingModal, closeModal} = useModalControllerSelector();

    const lukkTildelingFeiletModal = () => {
        closeFeilmeldingModal();
        logEvent('portefolje.metrikker.tildel-veileder-feilet', {sideNavn: finnSideNavn()});
    };

    const lukkTildelingVellykketModal = () => {
        closeModal();
        logEvent('portefolje.metrikker.tildel-veileder-vellykket', {sideNavn: finnSideNavn()});
    };

    return (
        <>
            <ServerFeilModal
                isOpen={serverfeilModalSkalVises === NY_FEILET_MODAL}
                onClose={closeServerfeilModal}
            />
            <TildelingerOk
                isOpen={modal.modal === VIS_TILDELING_SUKSESS_MODAL}
                onRequestClose={lukkTildelingVellykketModal}
                fnr={modal.brukere || []}
            />
            <FeilmeldingTildelingModal
                isOpen={feilmeldingModal.aarsak === TILDELING_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                fnrSuksess={feilmeldingModal.brukereOk}
                onClose={lukkTildelingFeiletModal}
            />
            <FeilmeldingBrukereModal
                isOpen={feilmeldingModal.aarsak === LEGG_TIL_ARBEIDSLISTE_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                onClose={closeFeilmeldingModal}
                tittelTekst="Handlingen kan ikke utføres"
                infotekstTekst="Kunne ikke opprette arbeidsliste for følgende bruker(e):"
            />
            <FeilmeldingBrukereModal
                isOpen={feilmeldingModal.aarsak === FJERN_FRA_ARBEIDSLISTE_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                onClose={closeFeilmeldingModal}
                tittelTekst="Handlingen kan ikke utføres"
                infotekstTekst="Kunne ikke slette arbeidsliste for følgende bruker(e):"
            />
        </>

    );

}


