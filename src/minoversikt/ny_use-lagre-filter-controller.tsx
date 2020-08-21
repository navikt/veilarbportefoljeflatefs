import {useEffect} from "react";
import {erObjektValuesTomt, lagredeFilterListerErLik} from "../components/modal/lagrede-filter/lagrede-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {avmarkerSisteVelgtFilter, avmarkerVelgtFilter, markerVelgtFilter} from "../ducks/lagret-filter-ui";

export function NyUseLagreFilterController(props: {filtergruppe: string}) {
    const dispatch = useDispatch()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const lagretFilterList = useSelector((state: AppState) => state.lagretFilter.data);


    useEffect(() => {
        const valgtFilter = lagretFilterList.find(elem => lagredeFilterListerErLik(elem.filterValg, filtreringMinOversikt));

        if (erObjektValuesTomt(filtreringMinOversikt)){
            dispatch(avmarkerSisteVelgtFilter(props.filtergruppe));
        }

        if (valgtFilter) {
            dispatch(markerVelgtFilter(valgtFilter, props.filtergruppe));
        } else {
            dispatch(avmarkerVelgtFilter(props.filtergruppe));
        }
    }, [filtreringMinOversikt, lagretFilterList, dispatch])

    return null;
}
