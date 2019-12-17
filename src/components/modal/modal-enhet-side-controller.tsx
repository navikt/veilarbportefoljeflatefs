import React from 'react';
import { TILDELING_FEILET } from '../../ducks/modal-feilmelding-brukere';
import ServerFeilModal from './server-feil-modal';
import {
    NY_FEILET_MODAL,
    REDIGERING_FEILET_MODAL,
    SLETTING_FEILET_MODAL,
    VIS_SERVERFEIL_MODAL
} from '../../ducks/modal-serverfeil';
import SlettingFeiletModal from './veiledergruppe/sletting-feilet-modal';
import LagringFeiletModal from './veiledergruppe/lagring-feilet-modal';
import OpprettingFeiletModal from './veiledergruppe/oppretting-feilet-modal';
import { ModalSuksess } from './modal-suksess';
import { Fnr, FnrList } from '../fnr-list';
import { Normaltekst } from 'nav-frontend-typografi';
import { VIS_TILDELING_SUKSESS_MODAL } from '../../ducks/modal';
import { useModalControllerSelector } from '../../hooks/redux/use-modal-controller.selector';
import FeilmeldingTildelingModal from './feilmelding-tildeling-modal';

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
            <SlettingFeiletModal
                isOpen={serverfeilModalSkalVises === SLETTING_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
            />
            <LagringFeiletModal
                isOpen={serverfeilModalSkalVises === REDIGERING_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
            />
            <OpprettingFeiletModal
                isOpen={serverfeilModalSkalVises === NY_FEILET_MODAL}
                onRequestClose={closeServerfeilModal}
            />
            <TildelingerOk
                isOpen={modal.modal === VIS_TILDELING_SUKSESS_MODAL}
                onRequestClose={closeModal}
                fnr={modal.brukere || []}
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
