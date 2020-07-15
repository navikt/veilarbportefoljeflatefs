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
import {lagredeFilterListerErLik} from "./lagrede-filter-utils";

export enum Visningstype {
    MENY,
    LAGRE_NYTT,
    OPPDATER
}

export interface LagretFilterValideringsError {
    filterNavn: OrNothing<string>
}

export function LagreFilterModal(props: { velgVisningstype: Visningstype, isOpen: boolean, onRequestClose: () => void }) {

    const valgtLagretFilter = useSelector((state: AppState) => state.lagretFilter.valgtLagretFilter)
    const lagredeFilter = useSelector((state: AppState) => state.lagretFilter.data)
    const lagretFilterHandlingsType = useSelector((state: AppState) => state.lagretFilter.handling)
    const lagretFilterStatus = useSelector((state: AppState) => state.lagretFilter.status)
    const currentSelection = useSelector((state: AppState) => state.filtreringMinoversikt);

    const [valgtVisningstype, setValgtVisningstype] = useState<Visningstype>(props.velgVisningstype)
    const [lagretFilterValidering, setLagretFilterValidering] = useState<LagretFilterValideringsError>({} as LagretFilterValideringsError)
    const [errorModalErApen, setErrorModalErApen] = useState(false)
    const [filterNavn, setFilterNavn] = useState<string>("")

    const erValgtFilterkombinasjonSammeSomLagretFilter = lagredeFilter.find(elem => lagredeFilterListerErLik(elem.filterValg, currentSelection));
    // const erValgtFilterkombinasjonSammeSomLagretFilter = lagredeFilterListerErLik(valgtLagretFilter?.filterValg!, currentSelection);

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

    const Meny = () => {
        return (
            <div className="lagret-filter-meny-modal__wrapper">
                {erValgtFilterkombinasjonSammeSomLagretFilter ?
                    <>
                        <Normaltekst>Det finnes allerede et lagret filter <b>"{valgtLagretFilter!.filterNavn}"</b> med
                            denne filterkombinasjonen. Oppdater navnet ved å klikke på knappen under.
                        </Normaltekst>
                        <br/>
                        <Knapp className="eksisterende-knapp"
                               onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}>
                            Oppdater eksisterende filter
                        </Knapp></>
                    :
                    <Hovedknapp className="ny-knapp blokk-xs"
                                onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}>
                        Lagre som nytt filter
                    </Hovedknapp>
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

    const lagretFilterNavn = lagredeFilter.filter(elem => elem.filterId === valgtLagretFilter?.filterId).map(elem => elem.filterNavn).toString()
    const [saveRequestSent, setSaveRequestSent] = useState(false)
    const tillatteHandlinger = [HandlingsType.NYTT, HandlingsType.REDIGERE, HandlingsType.SLETTE]

    useEffect(() => {
        if (saveRequestSent && tillatteHandlinger.includes(lagretFilterHandlingsType!)) {
            if (lagretFilterStatus === STATUS.PENDING) {
                console.log("pending: ", lagretFilterStatus);
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
                        gammeltFilterNavn={lagretFilterNavn}
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


