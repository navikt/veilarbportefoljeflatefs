import {useRedirectOnMount} from './hooks/use-redirect-on-mount';
import {useSetInitalEnhet} from './hooks/portefolje/use-set-enhet-hvis-enhet-i-url';
import React from 'react';
import {Alert} from '@navikt/ds-react';

export function RedirectPortefolje(props: React.PropsWithChildren<{}>) {
    useRedirectOnMount();

    const {hasError} = useSetInitalEnhet();

    if (hasError) {
        return (
            <Alert variant="error" size="small">
                Noe gikk feil, prøv igjen senere.
            </Alert>
        );
    }

    return <>{props.children}</>;
}
