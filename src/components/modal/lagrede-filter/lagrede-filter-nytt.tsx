import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {Normaltekst} from "nav-frontend-typografi";
import {erTomtObjekt, feilValidering} from "./lagrede-filter-utils";
import {LagretFilterValideringsError} from "./lagre-filter-modal";
import {ErrorModalType, LagredeFilterVarselModal} from "./varsel-modal";
import {lagreNyttFilter} from "../../../ducks/lagret-filter";
import {useRequestHandler} from "../../../hooks/use-request-handler";

export function LagreNytt(props: { lukkModal}) {
    const filterValg = useSelector((state: AppState) => state.filtreringMinoversikt)
    const data = useSelector((state: AppState) => state.lagretFilter.data)
    const [filterNavn, setFilterNavn] = useState("")
    const [feilmelding, setFeilmelding] = useState({} as LagretFilterValideringsError)
    const dispatch = useDispatch();
    const lukkModal = props.lukkModal

    const requestHandler = useRequestHandler((state: AppState) => state.lagretFilter.status, lukkModal)

    const doLagreNyttFilter = (event) => {
        event.preventDefault()
        const feilValideringResponse = feilValidering(filterNavn, filterValg, data)
        setFeilmelding(feilValideringResponse)

        if (erTomtObjekt(feilValideringResponse)) {
            requestHandler.setSaveRequestSent(true)
            dispatch(lagreNyttFilter({
                filterNavn: filterNavn,
                filterValg: filterValg
            }))
        }
    }

    return (
        <>
            <form onSubmit={(e)=>doLagreNyttFilter(e)}>
                <Normaltekst className="blokk xs">Du vil finne igjen filteret under "Mine filter".</Normaltekst>
                <Input
                    label="Navn:"
                    value={filterNavn}
                    onChange={(e) => setFilterNavn(e.target.value)}
                    feil={feilmelding.filterNavn}
                    autoFocus={true}
                    maxLength={255}
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Hovedknapp mini htmlType={"submit"}>Lagre</Hovedknapp>
                </div>
            </form>
            <LagredeFilterVarselModal
                filterNavn={filterNavn}
                erApen = {requestHandler.errorModalErApen}
                setErrorModalErApen = {requestHandler.setErrorModalErApen}
                modalType={ErrorModalType.LAGRE}
            />
        </>
    )
}
