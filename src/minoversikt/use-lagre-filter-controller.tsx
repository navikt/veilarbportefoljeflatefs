import {useEffect} from "react";
import {avmarkerSisteVelgtFilter, avmarkerVelgtFilter, markerVelgtFilter} from "../ducks/lagret-filter";
import {erObjektValuesTomt, lagredeFilterListerErLik} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";

export function useLagreFilterController() {
    const dispatch = useDispatch()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const lagretFilterList = useSelector((state: AppState) => state.lagretFilter.data);


    useEffect(() => {
        const valgtFilter = lagretFilterList.find(elem => lagredeFilterListerErLik(elem.filterValg, filtreringMinOversikt));

        if (erObjektValuesTomt(filtreringMinOversikt)){
            dispatch(avmarkerSisteVelgtFilter());
        }

        if (valgtFilter) {
            dispatch(markerVelgtFilter(valgtFilter));
        } else {
            logEvent('portefolje.metrikker.lagredefilter.direkte-filtrering',
                {}, {sideNavn: finnSideNavn()});
            dispatch(avmarkerVelgtFilter());
        }
    }, [filtreringMinOversikt, lagretFilterList, dispatch])

    return null;
}
