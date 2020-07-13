import React, {useState} from "react";
import Modal from "../modal";
import {useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import "./lagret-filter.less"
import {OppdaterFilter} from "./lagrede-filter-oppdater";
import {LagreNytt} from "./lagrede-filter-nytt";
import {OrNothing} from "../../../utils/types/types";

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

export interface LagretFilterError {
    filterNavn: OrNothing<string>
}

export function LagreFilterModal(props: { velgVisningstype: Visningstype, isOpen: boolean, onRequestClose: () => void }) {

    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter)
    const lagredeFilter = useSelector((state: AppState) => state.lagretFilter.data)
    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(props.velgVisningstype)
    const [lagretFilterError, setLagretFilterError] = useState<LagretFilterError>({} as LagretFilterError)

    const lukkModal = () => {
        props.onRequestClose();
        setValgtVisningstype(props.velgVisningstype)
    }

    const feilValidering = (filterNavn, filterId?) => {
        let feilmelding: any = {} as LagretFilterError

        if (!filterNavn) {
            feilmelding.filterNavn = "Lagret filter mangler navn, legg inn filternavn."
        }

        if (filterNavn.length > 255) {
            feilmelding.filterNavn = "Filternavn er for langt, kan ikke ha mer enn 255 bokstaver."
        }

        if (lagredeFilter.find(elem => elem.filterId !== filterId && elem.filterNavn.toLowerCase() === filterNavn.toLowerCase())) {
            feilmelding.filterNavn = "Filternavn er allerede i bruk."
        }

        setLagretFilterError(feilmelding)
        return feilmelding
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

    const lagretFilterNavn = lagredeFilter.filter(elem => elem.filterId === valgtLagretFilter?.filterId).map(elem => elem.filterNavn);

    return (
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
                    feilValidering={feilValidering}
                    feil={lagretFilterError}
                />}

                {valgtVisningstype === Visningstype.OPPDATER &&
                <OppdaterFilter
                    filterNavn={lagretFilterNavn}
                    filterId={valgtLagretFilter?.filterId}
                    feilValidering={feilValidering}
                    feil={lagretFilterError}
                    lukkModal={lukkModal}
                />}
            </div>
        </Modal>
    );
}


