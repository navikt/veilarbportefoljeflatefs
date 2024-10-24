import React from 'react';
import {Alert, Link} from '@navikt/ds-react';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import {SKJUL_ARBEIDSLISTEFUNKSJONALITET} from '../../../konstanter';

export const HuskelappInfoAlert = () => {
    const arbeidslistefunksjonalitetSkalVises = !useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);

    if (arbeidslistefunksjonalitetSkalVises) {
        return (
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
    } else {
        return (
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
    }
};
