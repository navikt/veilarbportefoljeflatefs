import {useEffect} from "react";
import {
    avmarkerSisteValgtMineFilter,
    avmarkerValgtMineFilter,
    avmarkerValgtVeilederGruppe,
    markerMineFilter,
    markerValgtVeilederGruppe
} from "../ducks/lagret-filter-ui-state";
import {erObjektValuesTomt, lagretFilterValgModellErLik} from "../components/modal/mine-filter/mine-filter-utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {ListevisningType} from "../ducks/ui/listevisning";
import {veilederlisterErLik} from "../components/modal/veiledergruppe/veileder-gruppe-utils";

export function LagredeFilterUIController(props: { filtergruppe: ListevisningType }) {
    const dispatch = useDispatch()

    const filtreringEnhetensOversikt = useSelector((state: AppState) => state.filtreringEnhetensOversikt);
    const filtreringMinoversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const filtreringVeilederoversikt = useSelector((state: AppState) => state.filtreringVeilederoversikt);

    const lagretMineFilter = useSelector((state: AppState) => state.mineFilter.data);
    const lagretVeilederGrupper = useSelector((state: AppState) => state.veiledergrupperLagretFilter.data);

    useEffect(() => {
        const getFiltrering = () => {
            if (props.filtergruppe === ListevisningType.veilederOversikt) return filtreringVeilederoversikt;
            else if (props.filtergruppe === ListevisningType.minOversikt) return filtreringMinoversikt;
            else if (props.filtergruppe === ListevisningType.enhetensOversikt) return filtreringEnhetensOversikt;
        }

        const getLagretFilter = () => {
            if (props.filtergruppe === ListevisningType.veilederOversikt) return lagretVeilederGrupper;
            else return lagretMineFilter;
        }

        const valgtFilter = getLagretFilter().filter(elem => lagretFilterValgModellErLik(elem.filterValg,getFiltrering()))
        const valgtVeilederGruppe = lagretVeilederGrupper.filter(elem => veilederlisterErLik(elem.filterValg.veiledere,getFiltrering()!.veiledere))

        if (erObjektValuesTomt(getFiltrering())) {
            dispatch(avmarkerSisteValgtMineFilter(props.filtergruppe));
        }

        if (valgtFilter.length === 0){
            dispatch(avmarkerValgtMineFilter(props.filtergruppe));
            logEvent('portefolje.metrikker.lagredefilter.direkte-filtrering',
                {}, {sideNavn: finnSideNavn()});
        }else if (valgtFilter.length === 1){
            dispatch(markerMineFilter(valgtFilter[0], props.filtergruppe));
        }

        if (valgtVeilederGruppe.length === 0){
            dispatch(avmarkerValgtVeilederGruppe(props.filtergruppe));
        }else if (valgtVeilederGruppe.length === 1){
            dispatch(markerValgtVeilederGruppe(valgtVeilederGruppe[0], props.filtergruppe));
        }
    }, [dispatch, props.filtergruppe, lagretMineFilter, lagretVeilederGrupper, filtreringEnhetensOversikt, filtreringMinoversikt, filtreringVeilederoversikt])

    return null;
}


export default LagredeFilterUIController;
