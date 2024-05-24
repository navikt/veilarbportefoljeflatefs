import React from 'react';
import {Alert, Link} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';

export const HuskelappInfoAlert = () => (
    <Alert variant="info" size="small">
        Bruk huskelappen til informasjon som er viktig for oppfølgingen av personen.{' '}
        <Link
            href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
            target="_blank"
            rel="noopener"
            inlineText
        >
            Oppdatert info om bruk av huskelappen <ExternalLinkIcon />
        </Link>
    </Alert>
);
