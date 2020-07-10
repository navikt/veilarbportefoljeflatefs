import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {lagreEndringer, slettFilter} from "../../../ducks/lagret-filter_action-reducers";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import BekreftSlettingModal from "../bekreftelse-modal/bekreft-sletting-modal";

export function OppdaterFilter(props: { filterNavn, filterId, lukkModal }) {
    const [filternavn, setFilternavn] = useState<string>(props.filterNavn)
    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false)
    const dispatch = useDispatch();
    const selector = useSelector((state: AppState) => state.filtreringMinoversikt)
    const doLagreEndringer = () => {
        dispatch(lagreEndringer({
            filterNavn: filternavn,
            filterValg: selector,
            filterId: props.filterId
        }))
            .then(props.lukkModal)
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
                value={filternavn}
                onChange={(e) => setFilternavn(e.target.value)}
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