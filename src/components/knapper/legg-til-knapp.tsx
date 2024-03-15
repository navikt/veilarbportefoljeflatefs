import React from 'react';
import './knapper.css';
import {Button} from '@navikt/ds-react';
import {AddCircle} from '@navikt/ds-icons';

interface Props {
    onClick: () => void;
}

export function LeggTilKnapp({onClick}: Props) {
    return (
        <Button
            variant="tertiary"
            icon={<AddCircle className="ny-gruppe-knapp" />}
            className="veiledergruppe-knapp"
            onClick={onClick}
            data-testid="veiledergruppe_ny-gruppe_knapp"
            size="small"
        >
            Ny gruppe
        </Button>
    );
}
