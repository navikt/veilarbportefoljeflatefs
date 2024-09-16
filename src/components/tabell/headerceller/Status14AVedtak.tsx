import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import Header from '../header';
import * as React from 'react';

export const Status14AVedtak = ({valgteKolonner}: HeadercelleProps) => (
    <Header
        skalVises={valgteKolonner.includes(Kolonne.AVVIK_14A_VEDTAK)}
        title="Status §14a-vedtak"
        headerId="status-14a-vedtak-kolonne-header"
        className="col col-xs-2"
    >
        Status §14a-vedtak
    </Header>
);
