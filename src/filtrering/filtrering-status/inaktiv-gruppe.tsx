import BarInputGruppe from "../../components/barinput/barinput-gruppe";
import {BarInputRadio} from "../../components/barinput/barinput-radio";
import React from "react";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";
import {INAKTIVE_BRUKERE} from "../filter-konstanter";

export function FiltreringStatusInavtiveBrukere(props: FiltreringStatusGruppe) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

    return (
        <BarInputGruppe>
            <BarInputRadio
                filterNavn="inaktiveBrukere"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.inaktiveBrukere}
                checked={props.ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
            />
        </BarInputGruppe>
    )
}
