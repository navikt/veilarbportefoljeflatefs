import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Normaltekst} from "nav-frontend-typografi";
import {erTomtObjekt, feilValidering} from "./lagrede-filter-utils";
import {STATUS} from "../../../ducks/utils";
import {LagretFilterValideringsError} from "./lagre-filter-modal";
import {ErrorModalType, LagredeFilterVarselModal} from "./varsel-modal";
import {lagreNyttFilter} from "../../../ducks/lagret-filter";

export function LagreNytt(props: { lukkModal}) {

    const filterValg = useSelector((state: AppState) => state.filtreringMinoversikt)
    const {status, data} = useSelector((state: AppState) => state.lagretFilter)
    const [filterNavn, setFilterNavn] = useState("")
    const [saveRequestSent, setSaveRequestSent] = useState(false)
    const [errorModalErApen, setErrorModalErApen] = useState(false)
    const [feilmelding, setFeilmelding] = useState({} as LagretFilterValideringsError)
    const lukkModal = props.lukkModal
    const dispatch = useDispatch();

    useEffect(() => {
        if (saveRequestSent) {
            if (status === STATUS.PENDING) {
            } else if (status === STATUS.ERROR) {
                setErrorModalErApen(true)
                setSaveRequestSent(false)
            } else if (status === STATUS.OK) {
                setErrorModalErApen(false)
                setSaveRequestSent(false)
                lukkModal()
            }
        }
    }, [status, saveRequestSent, lukkModal])

    const doLagreNyttFilter = () => {
        const trimmetFilterNavn = filterNavn.trim()
        const feilValideringResponse = feilValidering(trimmetFilterNavn, data)
        setFeilmelding(feilValideringResponse)

        if (erTomtObjekt(feilValideringResponse)) {
            dispatch(lagreNyttFilter({
                filterNavn: trimmetFilterNavn,
                filterValg: filterValg
            }))
            setSaveRequestSent(true)
        }
    }

    return (
        <>
            <Normaltekst>Du vil finne igjen filteret under "Lagrede filter".</Normaltekst>
            <br/>
            <Input
                label="Navn:"
                value={filterNavn}
                onChange={(e) => setFilterNavn(e.target.value)}
                feil={feilmelding.filterNavn}
            />
            <div className="lagret-filter-knapp-wrapper">
                <Hovedknapp mini onClick={doLagreNyttFilter}>Lagre</Hovedknapp>
            </div>
            <LagredeFilterVarselModal
                filterNavn={filterNavn}
                erApen = {errorModalErApen}
                setErrorModalErApen = {setErrorModalErApen}
                modalType={ErrorModalType.LAGRE}
            />
        </>
    )
}
