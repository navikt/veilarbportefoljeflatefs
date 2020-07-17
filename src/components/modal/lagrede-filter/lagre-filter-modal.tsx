import React, {useEffect, useState} from "react";
import Modal from "../modal";
import {useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import "./lagret-filter.less"
import {OppdaterFilter} from "./lagrede-filter-oppdater";
import {LagreNytt} from "./lagrede-filter-nytt";
import {OrNothing} from "../../../utils/types/types";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {HandlingsType} from "../../../ducks/lagret-filter_action-reducers";
import {STATUS} from "../../../ducks/utils";
import {VarselModal, VarselModalType} from "../varselmodal/varselmodal";

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

export interface LagretFilterValideringsError {
    filterNavn: OrNothing<string>
}

export function LagreFilterModal(props: { velgVisningstype: Visningstype, isOpen: boolean, onRequestClose: () => void, erNavnEllerFnrBrukt? }) {

    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter)
    const sisteValgteLagredeFilter = useSelector((state: AppState) => state.lagretFilter.sisteValgteLagredeFilter)
    const lagredeFilter = useSelector((state: AppState) => state.lagretFilter.data)
    const lagretFilterHandlingsType = useSelector((state: AppState) => state.lagretFilter.handling)
    const lagretFilterStatus = useSelector((state: AppState) => state.lagretFilter.status)

    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(props.velgVisningstype)
    const [lagretFilterValidering, setLagretFilterValidering] = useState<LagretFilterValideringsError>({} as LagretFilterValideringsError)
    const [errorModalErApen, setErrorModalErApen] = useState(false)
    const [filterNavn, setFilterNavn] = useState<string>("")

    const lagretFilterNavn = (filterId) => lagredeFilter.filter(elem => elem.filterId === filterId).map(elem => elem.filterNavn).toString()
    const [saveRequestSent, setSaveRequestSent] = useState(false)
    const tillatteHandlinger = [HandlingsType.NYTT, HandlingsType.REDIGERE, HandlingsType.SLETTE]


    const lukkModal = () => {
        props.onRequestClose();
        setValgtVisningstype(props.velgVisningstype)
    }

    const feilValidering = (filterNavn, filterId?) => {
        let feilmelding: any = {} as LagretFilterValideringsError
        if (!filterNavn) {
            feilmelding.filterNavn = "Lagret filter mangler navn, legg inn filternavn."
        }

        if (filterNavn.length > 255) {
            feilmelding.filterNavn = "Filternavn er for langt, kan ikke ha mer enn 255 bokstaver."
        }

        if (lagredeFilter.find(elem => elem.filterId !== filterId && elem.filterNavn.toLowerCase() === filterNavn.toLowerCase())) {
            feilmelding.filterNavn = "Filternavn er allerede i bruk."
        }

        setLagretFilterValidering(feilmelding)
        return feilmelding
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

    useEffect(() => {
        if (saveRequestSent && tillatteHandlinger.includes(lagretFilterHandlingsType!)) {
            if (lagretFilterStatus === STATUS.PENDING) {
            } else if (lagretFilterStatus === STATUS.ERROR) {
                setErrorModalErApen(true)
                setSaveRequestSent(false)
            } else if (lagretFilterStatus === STATUS.OK) {
                setSaveRequestSent(false)
                props.onRequestClose();
                setValgtVisningstype(props.velgVisningstype)
            }
        }
    }, [lagretFilterStatus, lagretFilterHandlingsType, saveRequestSent, tillatteHandlinger, props])

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
                        feilValidering={feilValidering}
                        feilmelding={lagretFilterValidering}
                        lukkModal={lukkModal}
                        saveRequestSent={setSaveRequestSent}
                        filterNavn={filterNavn}
                        setFilterNavn={setFilterNavn}
                    />}

                    {valgtVisningstype === Visningstype.OPPDATER &&
                    <OppdaterFilter
                        gammeltFilterNavn={lagretFilterNavn(valgtLagretFilter?.filterId)}
                        filterId={valgtLagretFilter?.filterId}
                        feilValidering={feilValidering}
                        feil={lagretFilterValidering}
                        lukkModal={lukkModal}
                        setFilterNavn={setFilterNavn}
                        saveRequestSent={setSaveRequestSent}
                    />}
                </div>
            </Modal>

            <VarselModal contentLabel="Error"
                         onRequestClose={() => setErrorModalErApen(false)}
                         isOpen={errorModalErApen}
                         type={VarselModalType.FEIL}
                         closeButton={false}>
                {
                    lagretFilterHandlingsType === HandlingsType.NYTT &&
                    <>
                        <Innholdstittel>Filteret kunne ikke opprettes</Innholdstittel>
                        <br/>
                        <Normaltekst>Det oppsto en feil, og filteret "<b>{filterNavn}</b>" kunne ikke opprettes. Prøv
                            igjen senere.</Normaltekst>
                    </>
                }
                {
                    lagretFilterHandlingsType === HandlingsType.REDIGERE &&
                    <>
                        <Innholdstittel>Filteret kunne ikke lagres</Innholdstittel>
                        <br/>
                        <Normaltekst>Det oppsto en feil, og filteret "<b>{filterNavn}</b>" kunne ikke lagres. Prøv
                            igjen senere.</Normaltekst>
                    </>}
                {
                    lagretFilterHandlingsType === HandlingsType.SLETTE &&
                    <>
                        <Innholdstittel>Filteret kunne ikke slettes</Innholdstittel>
                        <br/>
                        <Normaltekst>Det oppsto en feil, og filteret "<b>{filterNavn}</b>" kunne ikke slettes. Prøv
                            igjen senere.</Normaltekst>
                    </>
                }
                <Hovedknapp mini
                            className="error-knapp"
                            onClick={() => setErrorModalErApen(false)}>
                    Lukk
                </Hovedknapp>
            </VarselModal>
        </>
    );
}


