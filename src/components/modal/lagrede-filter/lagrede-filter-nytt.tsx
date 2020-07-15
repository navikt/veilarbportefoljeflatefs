import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {lagreNyttFilter} from "../../../ducks/lagret-filter_action-reducers";
import {Normaltekst} from "nav-frontend-typografi";
import {erTomtObjekt} from "./lagrede-filter-utils";

export function LagreNytt(props: { lukkModal, feilValidering, feilmelding, saveRequestSent, filterNavn, setFilterNavn }) {

    const filterValg = useSelector((state: AppState) => state.filtreringMinoversikt)
    const dispatch = useDispatch();

    const doLagreNyttFilter = () => {
        const trimmetFilterNavn = props.filterNavn.trim()
        const feilmelding = props.feilValidering(trimmetFilterNavn)

        if (erTomtObjekt(feilmelding)) {
            dispatch(lagreNyttFilter({
                filterNavn: trimmetFilterNavn,
                filterValg: filterValg
            }))
            props.saveRequestSent(true)
        }
    }

    return (
        <>
            <Normaltekst>Du vil finne igjen filteret under "Lagrede filter".</Normaltekst>
            <br/>
            <Input
                label="Navn:"
                value={props.filterNavn}
                onChange={(e) => props.setFilterNavn(e.target.value)}
                feil={props.feilmelding.filterNavn}
            />
            <div className="lagret-filter-knapp-wrapper">
                <Hovedknapp mini onClick={doLagreNyttFilter}>Lagre</Hovedknapp>
            </div>

        </>
    )
}
