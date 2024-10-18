import React from 'react';
import {Alert, Link} from '@navikt/ds-react';

export const HuskelappInfoAlert = () => (
    <Alert variant="warning" size="small">
        <Link
            href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
            target="_blank"
            rel="noopener"
            inlineText
        >
            Gamle arbeidslister blir slettet 25. oktober
        </Link>{' '}
        (åpnes i ny fane)
    </Alert>
);
