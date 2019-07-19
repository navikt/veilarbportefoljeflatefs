import BarInputCheckbox from "../../components/barinput/barinput-checkbox";
import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";
import {NYE_BRUKERE_FOR_VEILEDER} from "../filter-konstanter";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";


export function FiltreringStatusNyeBrukere (props: FiltreringStatusGruppe) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

    return (
        <BarInputCheckbox
            filterNavn="nyeBrukere"
            max={statusTall.totalt}
            antall={statusTall.nyeBrukereForVeileder}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
        />
    )
}
