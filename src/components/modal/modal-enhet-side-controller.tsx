import {TILDELING_FEILET} from '../../ducks/modal-feilmelding-brukere';
import {ServerFeilModal} from './server-feil-modal';
import {
    NY_FEILET_MODAL,
    REDIGERING_FEILET_MODAL,
    SLETTING_FEILET_MODAL,
    VIS_SERVERFEIL_MODAL
} from '../../ducks/modal-serverfeil';
import {TildelingerOk} from './modal-tildelinger-ok';
import {VIS_TILDELING_SUKSESS_MODAL} from '../../ducks/modal';
import {FeilmeldingTildelingModal} from './feilmelding-tildeling-modal';
import {useModalControllerSelector} from '../../hooks/redux/use-modal-controller.selector';
import {VeiledergruppeendringFeiletModal} from './veiledergruppe/veiledergruppeendring-feilet-modal';
import {logEvent} from '../../utils/frontend-logger';
import './feilmelding-brukere.css';

export function ModalEnhetSideController() {
    const {serverfeilModalSkalVises, feilmeldingModal, modal, closeServerfeilModal, closeFeilmeldingModal, closeModal} =
        useModalControllerSelector();

    const lukkTildelingFeiletModal = () => {
        closeFeilmeldingModal();
        logEvent('portefolje.metrikker.tildel-veileder-feilet');
    };

    const lukkTildelingVellykketModal = () => {
        closeModal();
        logEvent('portefolje.metrikker.tildel-veileder-vellykket');
    };

    return (
        <>
            <ServerFeilModal
                isOpen={serverfeilModalSkalVises === VIS_SERVERFEIL_MODAL}
                onClose={closeServerfeilModal}
            />
            <FeilmeldingTildelingModal
                isOpen={feilmeldingModal.aarsak === TILDELING_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                fnrSuksess={feilmeldingModal.brukereOk}
                onClose={lukkTildelingFeiletModal}
            />
            <TildelingerOk
                isOpen={modal.modal === VIS_TILDELING_SUKSESS_MODAL}
                onRequestClose={lukkTildelingVellykketModal}
                fnr={modal.brukere || []}
            />
            <VeiledergruppeendringFeiletModal
                isOpen={serverfeilModalSkalVises === SLETTING_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
                innholdstittel="Sletting feilet"
                tekst="Beklager, men gruppen kunne ikke slettes. Prøv igjen senere."
            />
            <VeiledergruppeendringFeiletModal
                isOpen={serverfeilModalSkalVises === NY_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
                innholdstittel="Oppretting av gruppe feilet"
                tekst="Beklager, men gruppen kunne ikke opprettes."
            />
            <VeiledergruppeendringFeiletModal
                isOpen={serverfeilModalSkalVises === REDIGERING_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
                innholdstittel="Redigering feilet"
                tekst="Beklager, men gruppen kunne ikke redigeres."
            />
        </>
    );
}
