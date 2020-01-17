import FiltreringLabelContainer from "../filtrering/filtrering-label-container";
import {lagLablerTilVeiledereMedIdenter} from "../filtrering/utils";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {slettEnkeltFilter} from "../ducks/filtrering";
import {defaultVeileder} from "../filtrering/filtrering-container";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";

export function EnhetFilter () {
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak.data.tiltak);
    const filtervalg =  useSelector((state: AppState) => state.filtrering);
    const veilederliste = useSelector( (state: AppState) => state.veiledere.data.veilederListe);
    const listevisning = useSelector( (state: AppState) => state.ui.listevisningEnhetensOversikt);
    const ident = useIdentSelector();

    const dispatch = useDispatch();

    function slettVeilederFilter() {
        dispatch(slettEnkeltFilter('veiledere', ident, 'enhet', defaultVeileder))
    }


    return (
        <FiltreringLabelContainer
            filtervalg={{
                ...filtervalg,
                veiledere: lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter)
            }}
            filtergruppe="enhet"
            enhettiltak={enhettiltak}
            listevisning={listevisning}
        />
    )
}