import {useEffect} from "react";
import {avmarkerSisteVelgtFilter, avmarkerVelgtFilter, markerVelgtFilter} from "../ducks/lagret-filter";
import {erObjektValuesTomt, lagredeFilterListerErLik} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";

export function useLagreFilterController(props: { filtergruppe: string }) {
    const dispatch = useDispatch()
    const filtrering = useSelector((state: AppState) => props.filtergruppe === "veileder" ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt);
    const lagretFilterList = useSelector((state: AppState) => state.lagretFilter.data);
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));

    useEffect(() => {
        if (!lagredeFilterFeatureToggleErPa) {
            return;
        }
        const valgtFilter = lagretFilterList.find(elem => lagredeFilterListerErLik(elem.filterValg, filtrering));

        if (erObjektValuesTomt(filtrering) || erObjektValuesTomt(filtrering)) {
            dispatch(avmarkerSisteVelgtFilter(props.filtergruppe));
        }

        if (valgtFilter) {
            dispatch(markerVelgtFilter(valgtFilter, props.filtergruppe));

        } else {
            dispatch(avmarkerVelgtFilter(props.filtergruppe));
            logEvent('portefolje.metrikker.lagredefilter.direkte-filtrering',
                {}, {sideNavn: finnSideNavn()});
        }

    }, [filtrering, lagretFilterList, dispatch, lagredeFilterFeatureToggleErPa, props.filtergruppe])

    return null;
}
