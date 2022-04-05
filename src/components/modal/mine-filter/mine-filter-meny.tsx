import React from 'react';
import {Visningstype} from './mine-filter-modal';
import {BodyShort, Button} from '@navikt/ds-react';

export function Meny(props: {setValgtVisningstype: (visningstype: Visningstype) => void; sisteFilterNavn}) {
    return (
        <div className="mine-filter-meny-modal__wrapper">
            <Button
                className="ny-knapp"
                data-testid="lagre-nytt-filter_modal_knapp"
                onClick={() => props.setValgtVisningstype(Visningstype.LAGRE_NYTT)}
            >
                Lagre som nytt filter
            </Button>

            <BodyShort size="small" className="tekst" data-testid="mine-filter_modal_oppdater-filter-tekst">
                Oppdater <strong>"{props.sisteFilterNavn}"</strong> ved å klikke på knappen under.
            </BodyShort>

            <Button
                variant="secondary"
                className="eksisterende-knapp"
                data-testid="oppdater-eksisterende-filter_modal_knapp"
                onClick={() => props.setValgtVisningstype(Visningstype.OPPDATER)}
            >
                Oppdater eksisterende filter
            </Button>
        </div>
    );
}
