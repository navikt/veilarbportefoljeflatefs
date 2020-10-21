import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../reducer";
import LagredeFilterInnhold from "./mine-filter_innhold";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { STATUS } from "../../ducks/utils";
import { HandlingsType } from "../../ducks/lagretFilter";
import { ListevisningType } from "../../ducks/ui/listevisning";

function FiltreringMineFilter(props: { filtergruppe: ListevisningType }) {
  const mineFilterState = useSelector((state: AppState) => state.mineFilter);
  const mineFilter = mineFilterState.data;
  mineFilter.sort((a, b) =>
    a.filterNavn
      .toLowerCase()
      .localeCompare(b.filterNavn.toLowerCase(), undefined, { numeric: true })
  );
  return (
    <>
      {mineFilterState.handlingType === HandlingsType.HENTE &&
      mineFilterState.status === STATUS.ERROR ? (
        <AlertStripeFeil>
          Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen
          senere.
        </AlertStripeFeil>
      ) : (
        <LagredeFilterInnhold
          mineFilter={mineFilter}
          filtergruppe={props.filtergruppe}
        />
      )}
    </>
  );
}

export default FiltreringMineFilter;
