import Knapp from "nav-frontend-knapper/lib/knapp";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  erObjektValuesTomt,
  lagretFilterValgModellErLik
} from "../components/modal/mine-filter/mine-filter-utils";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../reducer";
import { apneMineFilterModal } from "../ducks/lagret-filter-ui-state";
import { ListevisningType } from "../ducks/ui/listevisning";

export function MineFilterLagreFilterKnapp(props: { filtergruppe: string }) {
  const [erLagreKnappSkjult, setErLagreKnappSkjult] = useState(true);
  const filtreringMinOversikt = useSelector(
    (state: AppState) => state.filtreringMinoversikt
  );
  const filtreringEnhetensOversikt = useSelector(
    (state: AppState) => state.filtreringEnhetensOversikt
  );

  const erPaMinOversikt = props.filtergruppe === ListevisningType.minOversikt;
  const erPaEnhetensOversikt =
    props.filtergruppe === ListevisningType.enhetensOversikt;

  const filtrering = useSelector((state: AppState) =>
    erPaMinOversikt
      ? state.filtreringMinoversikt
      : state.filtreringEnhetensOversikt
  );
  const lagretFilterList = useSelector(
    (state: AppState) => state.mineFilter.data
  );
  const valgtFilter = !lagretFilterList.find(elem =>
    lagretFilterValgModellErLik(elem.filterValg, filtrering)
  );

  const dispatch = useDispatch();

  function lagreFilterModal(event) {
    event.preventDefault();
    dispatch(apneMineFilterModal(props.filtergruppe));
  }

  useEffect(() => {
    const ingenFilterValgt = erPaMinOversikt
      ? erObjektValuesTomt(filtreringMinOversikt)
      : erObjektValuesTomt(filtreringEnhetensOversikt);

    if (
      (erPaMinOversikt && valgtFilter && !ingenFilterValgt) ||
      (erPaEnhetensOversikt && valgtFilter && !ingenFilterValgt)
    ) {
      setErLagreKnappSkjult(false);
    } else {
      setErLagreKnappSkjult(true);
    }
  }, [
    filtreringMinOversikt,
    filtreringEnhetensOversikt,
    erPaMinOversikt,
    erPaEnhetensOversikt,
    erLagreKnappSkjult,
    valgtFilter
  ]);

  return (
    <Knapp
      className="lagre-filter-knapp"
      mini
      hidden={erLagreKnappSkjult}
      onClick={event => lagreFilterModal(event)}
    >
      Lagre filter
    </Knapp>
  );
}
