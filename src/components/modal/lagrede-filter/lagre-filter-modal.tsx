import React, {useState} from "react";
import Modal from "../modal";
import {useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import "./lagret-filter.less"
import {OppdaterFilter} from "./lagrede-filter-oppdater";
import {LagreNytt} from "./lagrede-filter-nytt";

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

export function LagreFilterModal(props: { velgVisningstype: Visningstype, isOpen: boolean, onRequestClose: () => void }) {
    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter)
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(props.velgVisningstype)
    const lukkModal = () => {
        props.onRequestClose();
        setValgtVisningstype(props.velgVisningstype)
    }

    const Meny = () => {
        return (
            <div className="lagret-filter-meny-modal__wrapper">
                <Hovedknapp className="ny-knapp blokk-xs" onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}>
                    Lagre som nytt filter
                </Hovedknapp>
                {valgtLagretFilter &&
                <Knapp className="eksisterende-knapp" onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}>
                    Oppdater eksisterende filter
                </Knapp>}
            </div>
        )
    }

    const modalTittel = () => {
        if (valgtVisningstype === Visningstype.LAGRE_NYTT) {
            return "Lagre nytt filter"
        } else if (valgtVisningstype === Visningstype.OPPDATER) {
            return "Endre filter"
        }
        return "Lagre filter"
    }

    return (
        <Modal
            className="lagret-filter-meny-modal"
            contentLabel="Lagre filter meny modal"
            isOpen={props.isOpen}
            onRequestClose={lukkModal}
            tittel={modalTittel()}
        >
            <div className="modal-visningstype">
                {valgtVisningstype === Visningstype.MENY && <Meny/>}
                {valgtVisningstype === Visningstype.LAGRE_NYTT && <LagreNytt lukkModal={lukkModal}/>}
                {valgtVisningstype === Visningstype.OPPDATER &&
                <OppdaterFilter
                    filterNavn={valgtLagretFilter?.filterNavn}
                    filterId={valgtLagretFilter?.filterId}
                    lukkModal={lukkModal}
                />}
            </div>

        </Modal>
    );
}


