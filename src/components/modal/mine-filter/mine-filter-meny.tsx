import {Normaltekst} from 'nav-frontend-typografi';
import React from 'react';
import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import {Visningstype} from './mine-filter-modal';

const lagreNyttMineFilterKnapp = (setValgtVisningstype: (visningstype: Visningstype) => void) => {
    return (
        <Hovedknapp className="ny-knapp" onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}>
            Lagre som nytt filter
        </Hovedknapp>
    );
};

const oppdaterMineFilterKnapp = (setValgtVisningstype: (visningstype: Visningstype) => void) => {
    return (
        <Knapp className="eksisterende-knapp" onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}>
            Oppdater eksisterende filter
        </Knapp>
    );
};

export function Meny(props: {setValgtVisningstype: (visningstype: Visningstype) => void; sisteFilterNavn}) {
    return (
        <div className="mine-filter-meny-modal__wrapper">
            {lagreNyttMineFilterKnapp(props.setValgtVisningstype)}
            <Normaltekst>
                Oppdater <b>"{props.sisteFilterNavn}"</b> ved å klikke på knappen under.
            </Normaltekst>
            {oppdaterMineFilterKnapp(props.setValgtVisningstype)}
        </div>
    );
}
