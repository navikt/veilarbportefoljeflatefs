import {TILDELING_FEILET} from '../../ducks/modal-feilmelding-brukere';
import {ServerFeilModal} from './server-feil-modal';
import {VIS_TILDELING_SUKSESS_MODAL} from '../../ducks/modal';
import {useModalControllerSelector} from '../../hooks/redux/use-modal-controller.selector';
import {NY_FEILET_MODAL} from '../../ducks/modal-serverfeil';
import {FeilmeldingTildelingModal} from './feilmelding-tildeling-modal';
import {TildelingerOk} from './modal-tildelinger-ok';
import {logEvent} from '../../utils/frontend-logger';
import './feilmelding-brukere.css';

export function MinOversiktModalController() {
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
            <ServerFeilModal isOpen={serverfeilModalSkalVises === NY_FEILET_MODAL} onClose={closeServerfeilModal} />
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
        </>
    );
}
