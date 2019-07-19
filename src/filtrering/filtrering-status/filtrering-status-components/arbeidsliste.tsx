import React from "react";
import {MIN_ARBEIDSLISTE} from "../../filter-konstanter";
import {BarInputRadio} from "../../../components/barinput/barinput-radio";
import hiddenIf from "../../../components/hidden-if/hidden-if";
import {FiltreringStatusGruppe} from "./ufordelte-brukere";
import { Element } from 'nav-frontend-typografi';
import {useStatusTallSelector} from "../../../hooks/redux/use-statustall";

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

function FilterStatusMinArbeidsliste(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <>
            <ArbeidslisteTittel />
            <BarInputRadio
                filterNavn="minArbeidsliste"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.inaktiveBrukere}
                checked={props.ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </>
    )

}

export default hiddenIf(FilterStatusMinArbeidsliste);
