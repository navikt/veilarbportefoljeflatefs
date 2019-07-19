import {FiltreringStatusGruppe} from "./ufordelte-brukere";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";
import {BarInputRadio} from "../../components/barinput/barinput-radio";
import {MIN_ARBEIDSLISTE} from "../filter-konstanter";
import React from "react";
import {Element} from "nav-frontend-typografi";

function ArbeidslisteTittel() {
    return (
        <div className="minArbeidsliste__tittel">
            <div className="typo-element">
                <Element className="blokk-xxs" tag="h3">
                    Arbeidsliste
                </Element>
            </div>
        </div>
    );
}

export function FilterStatusMinArbeidsliste(props: FiltreringStatusGruppe) {
    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));
    return (
        <>
            <ArbeidslisteTittel />
            <BarInputRadio
                filterNavn="avtaltMoteMedNav"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.inaktiveBrukere}
                checked={props.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </>
    )

}
