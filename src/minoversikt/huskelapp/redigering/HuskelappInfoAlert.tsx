import React from 'react';
import {Alert, Link} from '@navikt/ds-react';

export const HuskelappInfoAlert = () => (
    <Alert variant="info" size="small">
        <Link
            href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
            target="_blank"
            rel="noopener"
            inlineText
        >
            Oppdatert info om personvern, sletting og innsyn for huskelapp
        </Link>{' '}
        (åpnes i ny fane)
    </Alert>
);
