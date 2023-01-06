import React from 'react';
import './knapper.css';
import {BodyShort, Button} from '@navikt/ds-react';
import {AddCircle} from '@navikt/ds-icons';

export function LeggTilKnapp(props: {onClick: () => void}) {
    return (
        <Button
            variant="tertiary"
            icon={<AddCircle className="ny-gruppe-knapp" />}
            className="veiledergruppe-knapp"
            onClick={props.onClick}
            data-testid="veiledergruppe_ny-gruppe_knapp"
            size="small"
        >
            Ny gruppe
        </Button>
    );
}
