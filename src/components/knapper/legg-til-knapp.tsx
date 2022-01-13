import React from 'react';
import './knapper.less';
import {Button} from '@navikt/ds-react';
import {AddCircle} from '@navikt/ds-icons';

export function LeggTilKnapp(props: {onClick: () => void}) {
    return (
        <Button
            variant="tertiary"
            className="veiledergruppe-knapp"
            onClick={props.onClick}
            data-testid="veiledergruppe_ny-gruppe_knapp"
        >
            <AddCircle className="ny-gruppe-knapp" />
            <span>Ny gruppe</span>
        </Button>
    );
}
