import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {LagretFilterValideringsError} from "./lagre-filter-modal";
import {erTomtObjekt, feilValidering} from "./lagrede-filter-utils";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {ErrorModalType, LagredeFilterVarselModal} from "./varsel-modal";
import BekreftSlettingModal from "../bekreftelse-modal/bekreft-sletting-modal";
import {lagreEndringer, slettFilter} from "../../../ducks/lagret-filter";
import {useRequestHandler} from "../../../hooks/use-request-handler";

export function OppdaterFilter(props: { gammeltFilterNavn, filterId, lukkModal }) {
    const dispatch = useDispatch();
    const filterValg = useSelector((state: AppState) => state.filtreringMinoversikt)
    const data = useSelector((state: AppState) => state.lagretFilter.data)
    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false)
    const [nyttFilterNavn, setNyttFilterNavn] = useState<string>(props.gammeltFilterNavn)

    const [feilmelding, setFeilmelding] = useState<LagretFilterValideringsError>({} as LagretFilterValideringsError)
    const {gammeltFilterNavn, filterId, lukkModal} = props;

    const requestHandlerOpddater = useRequestHandler((state: AppState) => state.lagretFilter.status, lukkModal);
    const requestHandlerSlette = useRequestHandler((state: AppState) => state.lagretFilter.status, lukkModal);

    const doLagreEndringer = (event) => {
        event.preventDefault()
        const trimmetFilterNavn = nyttFilterNavn.trim()
        const feilValideringResponse = feilValidering(trimmetFilterNavn, filterValg, data, filterId)
        setFeilmelding(feilValideringResponse)

        if (erTomtObjekt(feilValideringResponse)) {
            setNyttFilterNavn(trimmetFilterNavn)
            dispatch(lagreEndringer({
                filterNavn: trimmetFilterNavn,
                filterValg: filterValg,
                filterId: filterId
            }))
            requestHandlerOpddater.setSaveRequestSent(true)
        }
    }

    const bekreftSletting = (event) => {
        event.preventDefault()
        setVisBekreftSlettModal(true)
    }

    const doSlettFilter = () => {
        dispatch(slettFilter(filterId))
        requestHandlerSlette.setSaveRequestSent(true)
    }

    return (
        <>
            <form onSubmit={(e) => doLagreEndringer(e)}>
                <Input
                    label="Navn:"
                    value={nyttFilterNavn}
                    onChange={(e) => setNyttFilterNavn(e.target.value)}
                    feil={feilmelding.filterNavn}
                    autoFocus={true}
                    maxLength={255}
                />
                <div className="lagret-filter-knapp-wrapper">
                    <Hovedknapp mini htmlType="submit">Lagre</Hovedknapp>
                    <Knapp mini onClick={(e) => bekreftSletting(e)}>Slett</Knapp>
                </div>
            </form>
            <BekreftSlettingModal
                isOpen={visBekreftSlettModal}
                onRequestClose={() => setVisBekreftSlettModal(false)}
                onSubmit={doSlettFilter}
                tittel="Slette lagret filter"
                navn={gammeltFilterNavn}/>
            <LagredeFilterVarselModal
                filterNavn={nyttFilterNavn}
                erApen={requestHandlerOpddater.errorModalErApen}
                modalType={ErrorModalType.OPPDATERE}
                setErrorModalErApen={requestHandlerOpddater.setErrorModalErApen}
            />
            <LagredeFilterVarselModal
                filterNavn={nyttFilterNavn}
                erApen={requestHandlerSlette.errorModalErApen}
                modalType={ErrorModalType.SLETTE}
                setErrorModalErApen={requestHandlerSlette.setErrorModalErApen}
            />
        </>
    )
}
