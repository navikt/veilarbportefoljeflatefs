import {PropsWithChildren} from 'react';
import {Alert} from '@navikt/ds-react';
import {useRedirectOnMount} from './hooks/use-redirect-on-mount';
import {useSetInitalEnhet} from './hooks/portefolje/use-set-enhet-hvis-enhet-i-url';

export function RedirectPortefolje({children}: PropsWithChildren<{}>) {
    useRedirectOnMount();

    const {hasError} = useSetInitalEnhet();

    if (hasError) {
        return (
            <Alert variant="error" size="small">
                Noe gikk feil, prøv igjen senere.
            </Alert>
        );
    }

    return <>{children}</>;
}
