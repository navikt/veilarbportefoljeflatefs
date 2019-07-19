import React from "react";
import {I_AVTALT_AKTIVITET, IKKE_I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER} from "../../filter-konstanter";
import {BarInputRadio} from "../../../components/barinput/barinput-radio";
import BarInputGruppe from "../../../components/barinput/barinput-gruppe";
import {useStatusTallSelector} from "../../../hooks/redux/use-statustall";

interface FiltreringStatusAktivitetProps {
    ferdigfilterListe: string[];
    handleChange: (e: any)=> void;
}

export function FiltreringStatusAktiviteter (props: FiltreringStatusAktivitetProps) {
    const statusTall = useStatusTallSelector();
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
