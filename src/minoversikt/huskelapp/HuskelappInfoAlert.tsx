import React from 'react';
import {Alert, Link} from '@navikt/ds-react';

export const HuskelappInfoAlert = () => (
    <Alert variant="info" className="blokk-xs">
        Du skal ikke skrive sensitive opplysninger eller annen informasjon som personen skal ha innsyn i her.{' '}
        <Link>Mer informasjon om huskelap på Navet.</Link>
    </Alert>
);
