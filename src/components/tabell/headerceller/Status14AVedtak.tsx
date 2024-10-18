import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import Header from '../header';
import * as React from 'react';

export const Status14AVedtak = ({valgteKolonner}: HeadercelleProps) => (
    // Dette er den som samanliknar gjeldande vedtak og "den i Arena". Viser om det er skilnad mellom kjeldene.
    <Header
        skalVises={valgteKolonner.includes(Kolonne.AVVIK_14A_VEDTAK)}
        title="Status for §14a-vedtak (sammenligning mellom Arena og ny løsning)"
        headerId="status-14a-vedtak-kolonne-header"
        className="col col-xs-2"
    >
        Status §14a-vedtak
    </Header>
);
