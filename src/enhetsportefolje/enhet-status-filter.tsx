import FiltreringContainer from "../filtrering/filtrering-container";
import * as React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../reducer";
import {sortTiltak} from "../filtrering/filtrering-status/filter-utils";

export function EnhetStatusFilter() {
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak.data.tiltak);
    const filtervalg =  useSelector((state: AppState) => state.filtrering);
    const tiltak = sortTiltak(enhettiltak);

    return (
        <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
            <FiltreringContainer
                filtervalg={filtervalg}
                enhettiltak={tiltak}
                filtergruppe="enhet"
            />
        </div>
    )

}