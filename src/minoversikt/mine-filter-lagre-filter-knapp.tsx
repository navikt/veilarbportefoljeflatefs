import Knapp from "nav-frontend-knapper/lib/knapp";
import * as React from "react";
import {useEffect, useState} from "react";
import {erObjektValuesTomt, lagredeFilterListerErLik} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";
import {apenLagreFilterModal} from "../ducks/lagret-filter";

export function MineFilterLagreFilterKnapp(props: { filtergruppe: string }) {
    const [erLagreKnappSkjult, setErLagreKnappSkjult] = useState(true);
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const filtreringEnhetensOversikt = useSelector((state: AppState) => state.filtreringEnhetensOversikt);

    const erPaMinOversikt = props.filtergruppe === 'veileder';
    const erPaEnhetensOversikt = props.filtergruppe === 'enhet';

    const filtrering = useSelector((state: AppState) => erPaMinOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt);
    const lagretFilterList = useSelector((state: AppState) => state.lagretFilter.data);
    const valgtFilter = !lagretFilterList.find(elem => lagredeFilterListerErLik(elem.filterValg, filtrering));

    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));

    const dispatch = useDispatch();

    function lagreFilterModal(event) {
        event.preventDefault()
        dispatch(apenLagreFilterModal(props.filtergruppe))
    }

    useEffect(() => {
        const ingenFilterValgtMinOversikt = erObjektValuesTomt(filtreringMinOversikt)
        const ingenFilterValgtEnhetensOversikt = erObjektValuesTomt(filtreringEnhetensOversikt)

        if ((erPaMinOversikt && valgtFilter && !ingenFilterValgtMinOversikt) ||
            (erPaEnhetensOversikt && valgtFilter && !ingenFilterValgtEnhetensOversikt)) {
            setErLagreKnappSkjult(false)
        } else {
            setErLagreKnappSkjult(true)
        }
    }, [filtreringMinOversikt, filtreringEnhetensOversikt, erPaMinOversikt, erPaEnhetensOversikt, erLagreKnappSkjult, valgtFilter]);

    return (
        <Knapp className="lagre-filter-knapp" mini
               hidden={erLagreKnappSkjult || !lagredeFilterFeatureToggleErPa}
               onClick={(event) => lagreFilterModal(event)}>
            Lagre filter
        </Knapp>
    )
}
