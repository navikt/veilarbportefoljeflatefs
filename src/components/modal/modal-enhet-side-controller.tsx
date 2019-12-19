import React from 'react';
import { TILDELING_FEILET } from '../../ducks/modal-feilmelding-brukere';
import ServerFeilModal from './server-feil-modal';
import {
    NY_FEILET_MODAL,
    REDIGERING_FEILET_MODAL,
    SLETTING_FEILET_MODAL,
    VIS_SERVERFEIL_MODAL
} from '../../ducks/modal-serverfeil';
import { ModalSuksess } from './modal-suksess';
import { Fnr, FnrList } from '../fnr-list';
import { Normaltekst } from 'nav-frontend-typografi';
import { VIS_TILDELING_SUKSESS_MODAL } from '../../ducks/modal';
import FeilmeldingTildelingModal from './feilmelding-tildeling-modal';
import { useModalControllerSelector } from '../../hooks/redux/use-modal-controller.selector';
import VeiledergruppeendringFeiletModal from './veiledergruppe/veiledergruppeendring-feilet-modal';

export function ModalEnhetSideController() {
    const {serverfeilModalSkalVises, feilmeldingModal, modal, closeServerfeilModal, closeFeilmeldingModal, closeModal} = useModalControllerSelector();

    return (
        <>
            <FeilmeldingTildelingModal
                isOpen={feilmeldingModal.aarsak === TILDELING_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                fnrSuksess={feilmeldingModal.brukereOk}
                onClose={closeFeilmeldingModal}
            />
            <ServerFeilModal
                isOpen={serverfeilModalSkalVises === VIS_SERVERFEIL_MODAL}
                onClose={closeServerfeilModal}
            />
            <TildelingerOk
                isOpen={modal.modal === VIS_TILDELING_SUKSESS_MODAL}
                onRequestClose={closeModal}
                fnr={modal.brukere || []}
            />
            <VeiledergruppeendringFeiletModal
                contentLabel="Sletting av veiledergruppe feilet"
                isOpen={serverfeilModalSkalVises === SLETTING_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
                innholdstittel="Sletting feilet"
                tekst="Beklager, men gruppen kunne ikke slettes. Prøv igjen senere."
            />
            <VeiledergruppeendringFeiletModal
                contentLabel="Oppretting av veiledergruppe feilet"
                isOpen={serverfeilModalSkalVises === NY_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
                innholdstittel="Oppretting av gruppe feilet"
                tekst="Beklager, men gruppen kunne ikke opprettes."
            />
            <VeiledergruppeendringFeiletModal
                contentLabel="Redigering av veiledergruppe feilet"
                isOpen={serverfeilModalSkalVises === REDIGERING_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
                innholdstittel="Redigering feilet"
                tekst="Beklager, men gruppen kunne ikke redigeres."
            />
        </>

    );

}

function TildelingerOk(props: { isOpen: boolean, onRequestClose: () => void; fnr: Fnr[] }) {
    return (
        <ModalSuksess
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            tittel="Handling utført"
            tekst="Følgende brukere ble tildelt veileder:"
        >
            <>
                <FnrList listeMedFnr={props.fnr}/>
                <Normaltekst>Det kan ta noe tid før oversikten blir oppdatert med tildelt veileder</Normaltekst>
            </>
        </ModalSuksess>
    );
}
