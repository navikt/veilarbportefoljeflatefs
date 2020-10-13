import Knapp from "nav-frontend-knapper/lib/knapp";
import * as React from "react";
import {useEffect, useState} from "react";
import {erObjektValuesTomt, lagretFilterValgModellErLik} from "../components/modal/mine-filter/mine-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {apneMineFilterModal} from "../ducks/lagret-filter-ui-state";
import {ListevisningType} from "../ducks/ui/listevisning";

export function NyMineFilterLagreFilterKnapp(props: { filtergruppe: string }) {
    const [erLagreKnappSkjult, setErLagreKnappSkjult] = useState(true);
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const filtreringEnhetensOversikt = useSelector((state: AppState) => state.filtreringEnhetensOversikt);

    const erPaMinOversikt = props.filtergruppe === ListevisningType.minOversikt;
    const erPaEnhetensOversikt = props.filtergruppe === ListevisningType.enhetensOversikt;

    const filtrering = useSelector((state: AppState) => erPaMinOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt);
    const mineFilterList = useSelector((state: AppState) => state.mineFilter.data);
    const valgtMineFilter = !mineFilterList.find(elem => lagretFilterValgModellErLik(elem.filterValg, filtrering));

    const dispatch = useDispatch();

    function lagreFilterModal(event) {
        event.preventDefault()
        dispatch(apneMineFilterModal(props.filtergruppe))
    }

    useEffect(() => {
        const ingenFilterValgt = erPaMinOversikt
            ? erObjektValuesTomt(filtreringMinOversikt)
            : erObjektValuesTomt(filtreringEnhetensOversikt)

        if ((erPaMinOversikt && valgtMineFilter && !ingenFilterValgt) ||
            (erPaEnhetensOversikt && valgtMineFilter && !ingenFilterValgt)) {
            setErLagreKnappSkjult(false)
        } else {
            setErLagreKnappSkjult(true)
        }
    }, [filtreringMinOversikt, filtreringEnhetensOversikt, erPaMinOversikt, erPaEnhetensOversikt, erLagreKnappSkjult, valgtMineFilter]);

    return (
        <Knapp className="ny__lagre-filter-knapp" mini
               hidden={erLagreKnappSkjult}
               data-testid="lagre-filter_knapp"
               onClick={(event) => lagreFilterModal(event)}>
            Lagre filter
        </Knapp>
    )
}
