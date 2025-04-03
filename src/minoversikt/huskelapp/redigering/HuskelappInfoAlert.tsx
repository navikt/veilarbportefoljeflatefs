import {Alert, Link} from '@navikt/ds-react';

export const HuskelappInfoAlert = () => (
    <Alert variant="info" size="small">
        <Link
            href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
            target="_blank"
            rel="noopener"
            inlineText
        >
            Personvern i huskelappen - har du lov, og er det nødvendig? (Navet)
        </Link>
    </Alert>
);
