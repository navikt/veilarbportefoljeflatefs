import BarInputCheckbox from "../../components/barinput/barinput-checkbox";
import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";
import {UFORDELTE_BRUKERE} from "../filter-konstanter";

export interface FiltreringStatusGruppe {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
}

export function FiltreringStatusUfordelteBrukere (props: FiltreringStatusGruppe) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

    return (
        <BarInputCheckbox
            filterNavn="ufordeltebruker"
            max={statusTall.totalt}
            antall={statusTall.ufordelteBrukere}
            handleChange={props.handleChange}
            checked={props.ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
        />
    )
}
