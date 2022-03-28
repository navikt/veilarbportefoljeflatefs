import * as React from 'react';
import {Alert, Link} from '@navikt/ds-react';

const ArbeidslisteInformasjonsmelding = () => (
    <Alert variant="info" className="stor-feil-modal" size="small">
        Arbeidslisten er <b>kun</b> til internt bruk. Informasjon som er relevant for personen eller saksbehandlingen
        skal alltid deles i dialogen.
        <br />
        <Link
            href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
            target="_blank"
        >
            <b>Les mer om hvordan bruke arbeidslisten på Navet.</b>
        </Link>
    </Alert>
);

export default ArbeidslisteInformasjonsmelding;
