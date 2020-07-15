import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {lagreEndringer, slettFilter} from "../../../ducks/lagret-filter_action-reducers";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import BekreftSlettingModal from "../bekreftelse-modal/bekreft-sletting-modal";
import {erTomtObjekt} from "./lagrede-filter-utils";

export function OppdaterFilter(props: { gammeltFilterNavn, filterId, lukkModal, feilValidering, feil, saveRequestSent, setFilterNavn }) {

    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false)

    const dispatch = useDispatch();
    const selector = useSelector((state: AppState) => state.filtreringMinoversikt)
    const [nyttFilterNavn, setNyttFilterNavn] = useState<string>(props.gammeltFilterNavn)

    const doLagreEndringer = () => {
        const trimmetFilterNavn = nyttFilterNavn.trim()
        const feilmelding = props.feilValidering(trimmetFilterNavn, props.filterId)

        if (erTomtObjekt(feilmelding)) {
            props.setFilterNavn(trimmetFilterNavn)
            dispatch(lagreEndringer({
                filterNavn: trimmetFilterNavn,
                filterValg: selector,
                filterId: props.filterId
            }))
            props.saveRequestSent(true)
        }
    }
    const doSlettFilter = () => {
        props.setFilterNavn(nyttFilterNavn)
        dispatch(slettFilter(
            props.filterId
        ))
        //TODO add lukkModal for bekreftModal
        props.saveRequestSent(true)
    }

    return (
        <>
            <Input
                label="Navn:"
                value={nyttFilterNavn}
                onChange={(e) => setNyttFilterNavn(e.target.value)}
                feil={props.feil.filterNavn}
            />
            <div className="lagret-filter-knapp-wrapper">
                <Hovedknapp mini onClick={doLagreEndringer}>Lagre</Hovedknapp>
                <Knapp mini onClick={() => setVisBekreftSlettModal(true)}>Slett</Knapp>
            </div>
            <BekreftSlettingModal
                isOpen={visBekreftSlettModal}
                onRequestClose={() => setVisBekreftSlettModal(false)}
                onSubmit={() => {
                    doSlettFilter()
                }}
                tittel="Slette lagret filter"
                navn={props.gammeltFilterNavn}/>
        </>
    )
}
