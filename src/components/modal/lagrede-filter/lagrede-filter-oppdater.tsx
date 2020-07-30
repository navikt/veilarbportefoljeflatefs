import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {LagretFilterValideringsError} from "./lagre-filter-modal";
import {STATUS} from "../../../ducks/utils";
import {erTomtObjekt, feilValidering} from "./lagrede-filter-utils";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {ErrorModalType, LagredeFilterVarselModal} from "./varsel-modal";
import BekreftSlettingModal from "../bekreftelse-modal/bekreft-sletting-modal";
import {lagreEndringer, slettFilter} from "../../../ducks/lagret-filter";

export function OppdaterFilter(props: { gammeltFilterNavn, filterId, lukkModal }) {

    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false)

    const dispatch = useDispatch();
    const selector = useSelector((state: AppState) => state.filtreringMinoversikt)
    const {status, data} = useSelector((state: AppState) => state.lagretFilter)
    const [nyttFilterNavn, setNyttFilterNavn] = useState<string>(props.gammeltFilterNavn)

    const [errorModalErApen, setErrorModalErApen] = useState(false)
    const [saveRequestSent, setSaveRequestSent] = useState(false)
    const [deleteRequestSent, setDeleteRequestSent] = useState(false)

    const [feilmelding, setFeilmelding] = useState<LagretFilterValideringsError>({} as LagretFilterValideringsError)
    const {gammeltFilterNavn, filterId, lukkModal} = props

    useEffect(() => {
        if (saveRequestSent) {
            if (status === STATUS.PENDING) {
            } else if (status === STATUS.ERROR) {
                setSaveRequestSent(false)
                setErrorModalErApen(true)
            } else if (status === STATUS.OK) {
                setSaveRequestSent(false)
                lukkModal()
            }
        } else if (deleteRequestSent) {
            if (status === STATUS.PENDING) {
            } else if (status === STATUS.ERROR) {
                setDeleteRequestSent(false)
                setErrorModalErApen(true)
            } else if (status === STATUS.OK) {
                setDeleteRequestSent(false)
                lukkModal()
            }
        }
    }, [status, saveRequestSent, deleteRequestSent, lukkModal, nyttFilterNavn])

    const doLagreEndringer = (event) => {
        event.preventDefault()
        const trimmetFilterNavn = nyttFilterNavn.trim()
        const feilValideringResponse = feilValidering(trimmetFilterNavn, data, filterId)
        setFeilmelding(feilValideringResponse)

        if (erTomtObjekt(feilValideringResponse)) {
            setNyttFilterNavn(trimmetFilterNavn)
            dispatch(lagreEndringer({
                filterNavn: trimmetFilterNavn,
                filterValg: selector,
                filterId: filterId
            }))
            setSaveRequestSent(true)
        }
    }

    const bekreftSletting = (event) => {
        event.preventDefault()
        setVisBekreftSlettModal(true)
    }

    const doSlettFilter = () => {
        dispatch(slettFilter(
            filterId
        ))
        setDeleteRequestSent(true)
    }

    return (
        <>
            <form onSubmit={(e) => doLagreEndringer(e)}>
                <Input
                    label="Navn:"
                    value={nyttFilterNavn}
                    onChange={(e) => setNyttFilterNavn(e.target.value)}
                    feil={feilmelding.filterNavn}
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Hovedknapp mini htmlType="submit">Lagre</Hovedknapp>
                    <Knapp mini onClick={(e) => bekreftSletting(e)}>Slett</Knapp>
                </div>
            </form>
            <BekreftSlettingModal
                isOpen={visBekreftSlettModal}
                onRequestClose={() => setVisBekreftSlettModal(false)}
                onSubmit={() => {
                    doSlettFilter()
                }}
                tittel="Slette lagret filter"
                navn={gammeltFilterNavn}/>
            <LagredeFilterVarselModal
                filterNavn={nyttFilterNavn}
                erApen={errorModalErApen}
                modalType={saveRequestSent ? ErrorModalType.OPPDATERE : ErrorModalType.SLETTE}
                setErrorModalErApen={setErrorModalErApen}
            />
        </>
    )
}
