import {useEffect} from "react";
import {erObjektValuesTomt, filterValgModellErLik} from "../components/modal/mine-filter/mine-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {avmarkerSisteValgtFilter, avmarkerValgtFilter, markerValgtFilter} from "../ducks/mine-filter-ui";

export function NyUseMineFilterController(props: {filtergruppe: string}) {
    const dispatch = useDispatch()
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const lagretFilterList = useSelector((state: AppState) => state.mineFilter.data);


    useEffect(() => {
        const valgtFilter = lagretFilterList.find(elem => filterValgModellErLik(elem.filterValg, filtreringMinOversikt));

        if (erObjektValuesTomt(filtreringMinOversikt)){
            dispatch(avmarkerSisteValgtFilter(props.filtergruppe));
        }

        if (valgtFilter) {
            dispatch(markerValgtFilter(valgtFilter, props.filtergruppe));
        } else {
            dispatch(avmarkerValgtFilter(props.filtergruppe));
        }
    }, [filtreringMinOversikt, lagretFilterList, dispatch])

    return null;
}
