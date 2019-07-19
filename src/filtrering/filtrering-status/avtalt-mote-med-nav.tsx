import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";
import {BarInputRadio} from "../../components/barinput/barinput-radio";
import {MOTER_IDAG} from "../filter-konstanter";
import React from "react";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";

export function FiltreringStatusAvtaltMoteMedNav(props: FiltreringStatusGruppe) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

    return (
        <>
            <BarInputRadio
                filterNavn="avtaltMoteMedNav"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.inaktiveBrukere}
                checked={props.ferdigfilterListe.includes(MOTER_IDAG)}
            />
        </>
    )

}
