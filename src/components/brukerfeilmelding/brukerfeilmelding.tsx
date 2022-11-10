import React from 'react';
import {Alert} from '@navikt/ds-react';
import {Brukerfeilmeldinger} from '../../model-interfaces';

export function Brukerfeilmelding(props: Brukerfeilmeldinger) {
    return (
        <Alert
            variant={props.variant}
            size={props.size}
            inline={true}
            aria-labelledby={props.text}
            tabIndex={0}
            data-testid={`brukerfeilmelding`}
        >
            {props.text}
        </Alert>
    );
}
