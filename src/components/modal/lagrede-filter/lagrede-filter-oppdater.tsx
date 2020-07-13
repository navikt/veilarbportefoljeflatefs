import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {lagreEndringer, slettFilter} from "../../../ducks/lagret-filter_action-reducers";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import BekreftSlettingModal from "../bekreftelse-modal/bekreft-sletting-modal";
import {erTomtObjekt} from "./lagrede-filter-utils";

export function OppdaterFilter(props: { filterNavn, filterId, lukkModal, feilValidering, feil }) {

    const [filterNavn, setFilterNavn] = useState<string>(props.filterNavn)
    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false)

    const dispatch = useDispatch();
    const selector = useSelector((state: AppState) => state.filtreringMinoversikt)

    const doLagreEndringer = () => {
        const trimmetFilterNavn = filterNavn.trim()
        const feilmelding = props.feilValidering(trimmetFilterNavn, props.filterId)

        if (erTomtObjekt(feilmelding)) {
            dispatch(lagreEndringer({
                filterNavn: filterNavn,
                filterValg: selector,
                filterId: props.filterId
            }))
                .then(props.lukkModal)
        }
    }
    const doSlettFilter = () => {
        dispatch(slettFilter(
            props.filterId
        ))
            .then(props.lukkModal)
    }
    return (
        <>
            <Input
                label="Navn:"
                value={filterNavn}
                onChange={(e) => setFilterNavn(e.target.value)}
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
                navn={props.filterNavn}/>
        </>
    )
}
