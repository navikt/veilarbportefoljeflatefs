import React from 'react';
import {Alert, Button, Link} from '@navikt/ds-react';
import './huskelapp.css';

export const LagHuskelappInngang = () => {
    return (
        <div className="lagHuskelappInngang">
            <Alert variant="info" size="small" className="blokk-xs">
                Du skal ikke skrive sensitive opplysninger eller annen informasjon som personen skal ha innsyn i her.
                <Link>Mer informasjon om huskelapp Navet</Link>
            </Alert>
            <Button size="xsmall" variant="primary-neutral">
                Lag huskelapp
            </Button>
        </div>
    );
};
