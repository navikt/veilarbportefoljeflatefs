import {Normaltekst} from 'nav-frontend-typografi';
import React from 'react';
import {Visningstype} from './mine-filter-modal';
import {Button} from '@navikt/ds-react';
import {SaveFile} from '@navikt/ds-icons';

const lagreNyttMineFilterKnapp = (setValgtVisningstype: (visningstype: Visningstype) => void) => {
    return (
        <Button
            className="ny-knapp"
            data-testid="lagre-nytt-filter_modal_knapp"
            onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}
        >
            Lagre som nytt filter
            <SaveFile />
        </Button>
    );
};

const oppdaterMineFilterKnapp = (setValgtVisningstype: (visningstype: Visningstype) => void) => {
    return (
        <Button
            variant="secondary"
            className="eksisterende-knapp"
            data-testid="oppdater-eksisterende-filter_modal_knapp"
            onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}
        >
            Oppdater eksisterende filter
        </Button>
    );
};

export function Meny(props: {setValgtVisningstype: (visningstype: Visningstype) => void; sisteFilterNavn}) {
    return (
        <div className="mine-filter-meny-modal__wrapper">
            {lagreNyttMineFilterKnapp(props.setValgtVisningstype)}
            <Normaltekst data-testid="mine-filter_modal_oppdater-filter-tekst">
                Oppdater <b>"{props.sisteFilterNavn}"</b> ved å klikke på knappen under.
            </Normaltekst>
            {oppdaterMineFilterKnapp(props.setValgtVisningstype)}
        </div>
    );
}
