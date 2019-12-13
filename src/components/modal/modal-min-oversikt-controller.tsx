import React from 'react';
import FeilmeldingBrukereModal from "./feilmelding-brukere-modal";
import {
    FJERN_FRA_ARBEIDSLISTE_FEILET,
    LEGG_TIL_ARBEIDSLISTE_FEILET,
    TILORDNING_FEILET
} from "../../ducks/modal-feilmelding-brukere";
import ServerFeilModal from "./server-feil-modal";
import {ModalSuksess} from "./modal-suksess";
import {Fnr, FnrList} from "../fnr-list";
import {Normaltekst} from "nav-frontend-typografi";
import { VIS_TILORDNING_SUKSESS_MODAL} from "../../ducks/modal";
import {useModalControllerSelector} from "../../hooks/redux/use-modal-controller.selector";
import {NY_FEILET_MODAL} from "../../ducks/modal-serverfeil";
import FeilmeldingTildelningModal from "./feilmelding-tildelning-modal";


export function MinOversiktModalController () {
    const {serverfeilModalSkalVises, feilmeldingModal, modal, closeServerfeilModal, closeFeilmeldingModal, closeModal} = useModalControllerSelector();
    return (
        <>
            <FeilmeldingTildelningModal
                isOpen={feilmeldingModal.aarsak === TILORDNING_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                fnrSuksess={feilmeldingModal.brukereOk}
                onClose={closeFeilmeldingModal}
            />
            <FeilmeldingBrukereModal
                isOpen={feilmeldingModal.aarsak === LEGG_TIL_ARBEIDSLISTE_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                onClose={closeFeilmeldingModal}
                tittelTekst="Handlingen kan ikke utføres"
                infotekstTekst="Kunne ikke opprette arbeidsliste for følgende brukere:"
            />
            <FeilmeldingBrukereModal
                isOpen={feilmeldingModal.aarsak === FJERN_FRA_ARBEIDSLISTE_FEILET}
                fnrFeil={feilmeldingModal.brukereError}
                onClose={closeFeilmeldingModal}
                tittelTekst="Handlingen kan ikke utføres"
                infotekstTekst="Kunne ikke slette arbeidsliste for følgende brukere:"
            />
            <ServerFeilModal
                isOpen={serverfeilModalSkalVises === NY_FEILET_MODAL}
                onClose={closeServerfeilModal}
            />
            <TildelningerOk
                isOpen={modal.modal === VIS_TILORDNING_SUKSESS_MODAL}
                onRequestClose={closeModal}
                fnr={modal.brukere || []}
            />
        </>

    )

}


function TildelningerOk(props: {isOpen: boolean, onRequestClose: ()=> void; fnr: Fnr[]}) {
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
    )
}