import {BarInputRadio} from "../../components/barinput/barinput-radio";
import React from "react";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";
import {ER_SYKMELDT_MED_ARBEIDSGIVER, TRENGER_VURDERING} from "../filter-konstanter";

export function FiltreringStatusTrengerVurderingEllerSykmeldt(props: FiltreringStatusGruppe) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

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
