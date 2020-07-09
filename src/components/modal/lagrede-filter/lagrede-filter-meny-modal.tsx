import React, {useState} from "react";
import Modal from "../modal";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import "./lagret-filter.less"
import {Input} from "nav-frontend-skjema";
import {Normaltekst} from "nav-frontend-typografi";
import {lagreEndringer} from "../../../ducks/lagret-filter_action-reducers";

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

function OppdaterFilter(props: { filterNavn, filterId, lukkModal }) {
    const [filternavn, setFilternavn] = useState<string>(props.filterNavn)
    const dispatch = useDispatch();
    const selector = useSelector((state: AppState) => state.filtreringMinoversikt)
    const doLagreEndringer = () => {
        dispatch(lagreEndringer({
            filterNavn: filternavn,
            filterValg: selector,
            filterId: props.filterId
        }))
            .then(props.lukkModal)
    }
    return (
        <>
            <Normaltekst>
                Endre filternavn fra {props.filterNavn}
            </Normaltekst>
            <Input
                label="Navn:"
                value={filternavn}
                onChange={(e) => setFilternavn(e.target.value)}
            />
            <Hovedknapp mini onClick={doLagreEndringer}>Lagre</Hovedknapp>
        </>
    )
}

export function LagreFilterMenyModal(props: { isOpen: boolean, onRequestClose: () => void }) {
    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter)
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(Visningstype.MENY)
    const lukkModal = () => {
        props.onRequestClose();
        setValgtVisningstype(Visningstype.MENY)
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

    const LagreNytt = () => {
        return (
            <div>
                <Normaltekst>
                    LAGRE NYTT
                </Normaltekst>
                <Input></Input>
            </div>
        )
    }

    return (
        <Modal
            className="lagret-filter-meny-modal"
            contentLabel="Lagre filter meny modal"
            isOpen={props.isOpen}
            onRequestClose={lukkModal}
            tittel="Lagre filter"
        >
            <div className="modal-visningstype">
                {valgtVisningstype === Visningstype.MENY && <Meny/>}
                {valgtVisningstype === Visningstype.LAGRE_NYTT && <LagreNytt/>}

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


