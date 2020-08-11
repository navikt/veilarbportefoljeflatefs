import {Normaltekst} from "nav-frontend-typografi";
import React from "react";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {Visningstype} from "./lagre-filter-modal";

const lagreNyttFilterKnapp = (setValgtVisningstype: (visningstype: Visningstype) => void) => {
    return (
        <Hovedknapp className="ny-knapp"
                    onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}>
            Lagre som nytt filter
        </Hovedknapp>
    )
}

const oppdaterFilterKnapp = (setValgtVisningstype: (visningstype: Visningstype) => void) => {
    return (
        <Knapp className="eksisterende-knapp"
               onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}>
            Oppdater eksisterende filter
        </Knapp>
    )
}

export function Meny(props: { setValgtVisningstype: (visningstype: Visningstype) => void, sisteFilterNavn }) {
    return <div className="lagret-filter-meny-modal__wrapper">
        {lagreNyttFilterKnapp(props.setValgtVisningstype)}
        <Normaltekst>Oppdater <b>"{props.sisteFilterNavn}"</b> ved å klikke på knappen under.</Normaltekst>
        {oppdaterFilterKnapp(props.setValgtVisningstype)}
    </div>
}
