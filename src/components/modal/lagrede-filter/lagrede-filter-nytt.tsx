import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../reducer";
import {lagreNyttFilter} from "../../../ducks/lagret-filter_action-reducers";


export function LagreNytt (props: {lukkModal}) {
    const filterValg = useSelector((state: AppState) => state.filtreringMinoversikt)
    const [filternavn, setFilternavn] = useState<string>("")
    const dispatch = useDispatch();
    const doLagreNyttFilter = () => {
        dispatch(lagreNyttFilter({
            filterNavn: filternavn,
            filterValg: filterValg
        }))
            .then(props.lukkModal)
    }

    return (
        <>
            <Input
                label="Navn:"
                value={filternavn}
                onChange={(e) => setFilternavn(e.target.value)}></Input>
            <Hovedknapp mini onClick={doLagreNyttFilter}>Lagre</Hovedknapp>
        </>
    )
}