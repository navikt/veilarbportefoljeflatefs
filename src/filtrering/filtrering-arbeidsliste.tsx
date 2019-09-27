import React from 'react';
import {MIN_ARBEIDSLISTE } from "./filter-konstanter";
import {RadioMedAntall} from "./components/radio-antall";
import {useDispatch, useSelector} from "react-redux";
import {useStatusTallSelector} from "../hooks/redux/use-statustall";
import {endreFiltervalg} from "../ducks/filtrering";
import {AppState} from "../reducer";
import {VeilederModell} from "../model-interfaces";
import hiddenIf from "../components/hidden-if/hidden-if";
import {Undertittel} from "nav-frontend-typografi";

function ArbeidslisteFilter (props: {veileder: VeilederModell}) {
    const dispatch = useDispatch();

    const ferdigfilterListe = useSelector((state: AppState) => state.filtreringMinoversikt.ferdigfilterListe);

    const statusTall = useStatusTallSelector();

    function dispatchFiltreringStatusChanged() {
        dispatch(endreFiltervalg(
            'ferdigfilterListe', [...ferdigfilterListe, MIN_ARBEIDSLISTE], "veileder", props.veileder));
    }
    return (
        <div className="min-arbeidsliste panel blokk-s">
            <Undertittel>Arbeidsliste</Undertittel>
            <RadioMedAntall
                className="mt1"
                labelNavn="Min arbeidsliste"
                antall={statusTall.minArbeidsliste}
                onChange={dispatchFiltreringStatusChanged}
                value={MIN_ARBEIDSLISTE}
                checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </div>
    )
}


export default hiddenIf(ArbeidslisteFilter);
