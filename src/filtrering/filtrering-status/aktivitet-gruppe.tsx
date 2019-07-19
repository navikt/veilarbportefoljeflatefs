
import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import { Statustall } from "../../ducks/statustall";
import { selectStatusTallData } from "../../enhetsportefolje/filtrering-status-enhet";
import {I_AVTALT_AKTIVITET, IKKE_I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER} from "../filter-konstanter";
import BarInputGruppe from "../../components/barinput/barinput-gruppe";
import {BarInputRadio} from "../../components/barinput/barinput-radio";

interface FiltreringStatusAktivitetProps {
    ferdigfilterListe: string[];
    handleChange: (e: any)=> void;
}

export function FiltreringStatusAktiviteter (props: FiltreringStatusAktivitetProps) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

    return (
        <BarInputGruppe>
            <BarInputRadio
                filterNavn="utlopteAktiviteter"
                antall={statusTall.utlopteAktiviteter}
                max={statusTall.totalt}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
            />
            <BarInputRadio
                filterNavn="ikkeIavtaltAktivitet"
                max={statusTall.totalt}
                antall={statusTall.ikkeIavtaltAktivitet}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(IKKE_I_AVTALT_AKTIVITET)}
            />
            <BarInputRadio
                filterNavn="iavtaltAktivitet"
                max={statusTall.totalt}
                antall={statusTall.ikkeIavtaltAktivitet}
                handleChange={props.handleChange}
                checked={props.ferdigfilterListe.includes(I_AVTALT_AKTIVITET)}
            />
        </BarInputGruppe>
    );
}
