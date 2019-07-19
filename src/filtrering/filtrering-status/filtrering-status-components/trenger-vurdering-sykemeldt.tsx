import React from "react";
import {ER_SYKMELDT_MED_ARBEIDSGIVER, TRENGER_VURDERING} from "../../filter-konstanter";
import {BarInputRadio} from "../../../components/barinput/barinput-radio";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";
import {useStatusTallSelector} from "../../../hooks/redux/use-statustall";


export function FiltreringStatusTrengerVurderingEllerSykmeldt(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <>
            <BarInputRadio
                filterNavn="trengerVurdering"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                checked={props.ferdigfilterListe.includes(TRENGER_VURDERING)}
                antall={statusTall.trengerVurdering}
            />
            <BarInputRadio
                filterNavn="erSykmeldtMedArbeidsgiver"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                checked={props.ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                antall={statusTall.erSykmeldtMedArbeidsgiver}
            />
        </>
    );
}
