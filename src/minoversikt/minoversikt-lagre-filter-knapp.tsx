import Knapp from "nav-frontend-knapper/lib/knapp";
import * as React from "react";
import {useEffect, useState} from "react";
import {erObjektValuesTomt} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";
import {apenLagreFilterModal} from "../ducks/lagret-filter";


export function MinoversiktLagreFilterKnapp(){
    const [erLagreKnappSkjult, setErLagreKnappSkjult] = useState(true);
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));

    const dispatch = useDispatch();

    function lagreFilterModal(event) {
        event.preventDefault()
        dispatch(apenLagreFilterModal())
    }

    useEffect(() => {
        const erMinOversiktFilterErTomt = erObjektValuesTomt(filtreringMinOversikt)
        console.log("minoversikt change", erMinOversiktFilterErTomt, filtreringMinOversikt)
        setErLagreKnappSkjult(erMinOversiktFilterErTomt)
    }, [filtreringMinOversikt]);

    return (
        <Knapp className="lagre-filter-knapp" mini hidden={erLagreKnappSkjult || !lagredeFilterFeatureToggleErPa}
               onClick={(event) => lagreFilterModal(event)}>
            Lagre filter
        </Knapp>
    )


}