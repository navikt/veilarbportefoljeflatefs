import FiltreringContainer from "../filtrering/filtrering-container";
import * as React from "react";
import {sortTiltak} from "../filtrering/filtrering-status/filter-utils";
import {useSelector} from "react-redux";
import {AppState} from "../reducer";
import {useGjeldendeVeileder} from "../hooks/use-gjeldende-veileder";

export function MinOversiktStatusFilter () {
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak.data.tiltak);
    const filtervalg =  useSelector((state: AppState) => state.filtreringMinoversikt);
    const tiltak = sortTiltak(enhettiltak);
    const gjeldendeVeileder = useGjeldendeVeileder();

    return (
        <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
            <FiltreringContainer
                filtervalg={filtervalg}
                filtergruppe="veileder"
                veileder={gjeldendeVeileder}
                enhettiltak={tiltak}
            />
        </div>
    )
}