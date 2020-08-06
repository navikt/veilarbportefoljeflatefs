import {Normaltekst} from "nav-frontend-typografi";
import React from "react";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {Visningstype} from "./lagre-filter-modal";

const lagreNyttFilterKnapp = (setValgtVisningstype) => {
    return (
        <Hovedknapp className="ny-knapp blokk-xs"
                    onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}>
            Lagre som nytt filter
        </Hovedknapp>
    )
}

const oppdaterFilterKnapp = (setValgtVisningstype) => {
    return (
        <Knapp className="eksisterende-knapp"
               onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}>
            Oppdater eksisterende filter
        </Knapp>
    )
}

const navnEllerFnrErBruktInnhold = () => {
    return (
        <>
            <Normaltekst>Fødselsnummer og navn kan ikke brukes i lagrede filter.</Normaltekst>
            <Normaltekst>Du må fjerne fødselsnummer og navn for å lagre filteret.</Normaltekst>
        </>
    )
}

const oppdatereEllerLagreNyttFilterInnhold = (filterNavn, setValgtVisningstype) => {
    return (
        <>
            {lagreNyttFilterKnapp(setValgtVisningstype)}
            <Normaltekst>Oppdater <b>"{filterNavn}"</b> ved å klikke på knappen under.</Normaltekst>
            {oppdaterFilterKnapp(setValgtVisningstype)}
        </>
    )
}

export function Meny(props: { setValgtVisningstype, sisteFilterNavn, erNavnEllerFnrBrukt }) {
    const getInhold = () => {
        if (props.erNavnEllerFnrBrukt) return navnEllerFnrErBruktInnhold()
        return oppdatereEllerLagreNyttFilterInnhold(props.sisteFilterNavn, props.setValgtVisningstype)
    }

    return (
        <div className="lagret-filter-meny-modal__wrapper">
            {getInhold()}
        </div>
    )
}