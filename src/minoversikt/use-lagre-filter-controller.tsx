import {useEffect} from "react";
import {avmarkerSisteVelgtFilter, avmarkerVelgtFilter, markerVelgtFilter} from "../ducks/lagret-filter";
import {erObjektValuesTomt, lagredeFilterListerErLik} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";

export function useLagreFilterController() {
    const dispatch = useDispatch()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const lagretFilterList = useSelector((state: AppState) => state.lagretFilter.data);
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));


    useEffect(() => {
        if (!lagredeFilterFeatureToggleErPa){
            return;
        }
        const valgtFilter = lagretFilterList.find(elem => lagredeFilterListerErLik(elem.filterValg, filtreringMinOversikt));

        if (erObjektValuesTomt(filtreringMinOversikt)){
            dispatch(avmarkerSisteVelgtFilter());
        }

        if (valgtFilter) {
            dispatch(markerVelgtFilter(valgtFilter));
        } else {
            dispatch(avmarkerVelgtFilter());
            logEvent('portefolje.metrikker.lagredefilter.direkte-filtrering',
                {}, {sideNavn: finnSideNavn()});
        }
    }, [filtreringMinOversikt, lagretFilterList, dispatch, lagredeFilterFeatureToggleErPa])

    return null;
}
