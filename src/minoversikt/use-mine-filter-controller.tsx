import {useEffect} from "react";
import {avmarkerSisteValgtFilter, avmarkerValgtFilter, markerValgtFilter} from "../ducks/mine-filter-ui";
import {erObjektValuesTomt, mineFilterListerErLik} from "../components/modal/mine-filter/mine-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {MINE_FILTER} from "../konstanter";
import {useFeatureSelector} from "../hooks/redux/use-feature-selector";
import {ListevisningType} from "../ducks/ui/listevisning";

export function useMineFilterController(props: { filtergruppe: string }) {
    const dispatch = useDispatch()
    const filtrering = useSelector((state: AppState) => props.filtergruppe === ListevisningType.minOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt);
    const lagretFilterList = useSelector((state: AppState) => state.mineFilter.data);
    const erMineFilterFeatureTogglePa = useFeatureSelector()(MINE_FILTER)

    useEffect(() => {
        if (!erMineFilterFeatureTogglePa) {
            return;
        }
        const valgtFilter = lagretFilterList.find(elem => mineFilterListerErLik(elem.filterValg, filtrering));

        if (erObjektValuesTomt(filtrering) || erObjektValuesTomt(filtrering)) {
            dispatch(avmarkerSisteValgtFilter(props.filtergruppe));
        }

        if (valgtFilter) {
            dispatch(markerValgtFilter(valgtFilter, props.filtergruppe));

        } else {
            dispatch(avmarkerValgtFilter(props.filtergruppe));
            logEvent('portefolje.metrikker.lagredefilter.direkte-filtrering',
                {}, {sideNavn: finnSideNavn()});
        }

    }, [filtrering, lagretFilterList, dispatch, erMineFilterFeatureTogglePa, props.filtergruppe])

    return null;
}
