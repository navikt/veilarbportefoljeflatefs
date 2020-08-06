import {Normaltekst} from "nav-frontend-typografi";
import React from "react";

export function FnrFeil() {
    return (
        <div className="lagret-filter-meny-modal__wrapper">
            <Normaltekst>Fødselsnummer og navn kan ikke brukes i mine filter.</Normaltekst>
            <Normaltekst>Du må fjerne fødselsnummer og navn for å lagre filteret.</Normaltekst>
        </div>
    )
}