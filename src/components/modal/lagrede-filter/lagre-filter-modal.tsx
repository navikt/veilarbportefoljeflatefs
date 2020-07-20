import React, {useState} from "react";
import Modal from "../modal";
import {useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import "./lagret-filter.less"
import {OppdaterFilter} from "./lagrede-filter-oppdater";
import {LagreNytt} from "./lagrede-filter-nytt";
import {OrNothing} from "../../../utils/types/types";
import {Normaltekst} from "nav-frontend-typografi";


export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

export interface LagretFilterValideringsError {
    filterNavn: OrNothing<string>
}

export function LagreFilterModal(props: { velgVisningstype: Visningstype, isOpen: boolean, onRequestClose: () => void, erNavnEllerFnrBrukt? }) {

    const {valgtLagretFilter, sisteValgteLagredeFilter, data} = useSelector((state: AppState) => state.lagretFilter)
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(props.velgVisningstype)
    const lagretFilterNavn = (filterId) => data.filter(elem => elem.filterId === filterId).map(elem => elem.filterNavn).toString()

    const lukkModal = () => {
        props.onRequestClose();
        setValgtVisningstype(props.velgVisningstype)
    }

    const lagreNyttFilterKnapp = () => {
        return (
            <Hovedknapp className="ny-knapp blokk-xs"
                        onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}>
                Lagre som nytt filter
            </Hovedknapp>
        )
    }

    const oppdaterFilterKnapp = () => {
        return (
            <Knapp className="eksisterende-knapp"
                   onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}>
                Oppdater eksisterende filter
            </Knapp>
        )
    }


    const Meny = () => {
        return (
            <div className="lagret-filter-meny-modal__wrapper">
                {/* - valgtLagretFilter != null -> active filter (intentional, unintentional), offer update of selected filter */}
                {/* - sisteValgteLagredeFilter == null -> offer to save as new filter */}
                {/* - sisteValgteLagredeFilter != null -> offer to save as new filter or to update existing */}
                {/* - hvis fødselsnummer/navn er tilstede -> offer a message saying you cannot save filter with this option*/}

                {props.erNavnEllerFnrBrukt ?
                    <>
                        <Normaltekst>Fødselsnummer og navn kan ikke brukes i lagrede filter.</Normaltekst>
                        <Normaltekst>Du må fjerne fødselsnummer og navn for å lagre filteret.</Normaltekst>
                    </>
                    : valgtLagretFilter
                        ? <>
                            <Normaltekst>Det finnes allerede et lagret
                                filter <b>"{valgtLagretFilter!.filterNavn}"</b> med
                                denne filterkombinasjonen. Oppdater navnet ved å klikke på knappen under.
                            </Normaltekst>
                            <br/>
                            {oppdaterFilterKnapp()}
                        </>
                        : sisteValgteLagredeFilter
                            ? <>
                                {lagreNyttFilterKnapp()}
                                <Normaltekst>Oppdater <b>"{lagretFilterNavn(sisteValgteLagredeFilter)}"</b> ved å klikke
                                    på
                                    knappen under.</Normaltekst>
                                {oppdaterFilterKnapp()}
                            </>
                            : <>
                                {lagreNyttFilterKnapp()}
                            </>
                }
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
        <>
            <Modal
                className="lagret-filter-meny-modal"
                contentLabel="Lagre filter meny modal"
                isOpen={props.isOpen}
                onRequestClose={lukkModal}
                tittel={modalTittel()}
            >
                <div className="modal-visningstype">

                    {valgtVisningstype === Visningstype.MENY &&
                    <Meny/>
                    }

                    {valgtVisningstype === Visningstype.LAGRE_NYTT &&
                    <LagreNytt
                        lukkModal={lukkModal}
                    />}

                    {valgtVisningstype === Visningstype.OPPDATER &&
                    <OppdaterFilter
                        gammeltFilterNavn={lagretFilterNavn(valgtLagretFilter?.filterId)}
                        filterId={valgtLagretFilter?.filterId}
                        lukkModal={lukkModal}
                    />}
                </div>
            </Modal>
        </>
    );
}


