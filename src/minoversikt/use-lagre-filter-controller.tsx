import {useEffect} from "react";
import {lagredeFilterListerErLik} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {avmarkerVelgtFilter, markerVelgtFilter} from "../ducks/lagret-filter";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";


export function useLagreFilterController() {
    const dispatch = useDispatch()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const lagretFilterList = useSelector((state: AppState) => state.lagretFilter.data);

    useEffect(() => {
        const valgtFilter = lagretFilterList.find(elem => lagredeFilterListerErLik(elem.filterValg, filtreringMinOversikt));
        if (valgtFilter) {
            dispatch(markerVelgtFilter(valgtFilter));
            logEvent('portefolje.metrikker.lagredefilter.valgt-lagret-filter',
                {}, {filterId: valgtFilter.filterId, sideNavn: finnSideNavn()});
        } else {
            dispatch(avmarkerVelgtFilter());
        }
    }, [filtreringMinOversikt, lagretFilterList, dispatch])

    return null
}
