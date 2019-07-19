import React from "react";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";
import BarInputCheckbox from "../../../components/barinput/barinput-checkbox";
import {NYE_BRUKERE_FOR_VEILEDER} from "../../filter-konstanter";
import hiddenIf from "../../../components/hidden-if/hidden-if";
import {useStatusTallSelector} from "../../../hooks/redux/use-statustall";


function FiltreringStatusNyeBrukere (props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();

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


export default hiddenIf(FiltreringStatusNyeBrukere);
