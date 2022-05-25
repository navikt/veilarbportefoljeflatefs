import * as React from 'react';
import {Alert, Link} from '@navikt/ds-react';

const ArbeidslisteInformasjonsmelding = () => (
    <Alert variant="info" className="arbeidsliste-alert" size="small">
        I arbeidslisten kan du notere ting du skal huske på til neste møte med personen eller ting du skal følge opp.
        Personen har ikke innsyn i arbeidslisten og derfor skal du ikke skrive sensitive opplysninger eller annen
        informasjon som er relevant for personen.
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
