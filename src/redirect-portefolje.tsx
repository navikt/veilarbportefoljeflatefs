import {useRedirectOnMount} from './hooks/use-redirect-on-mount';
import {useSetInitalEnhet} from './hooks/portefolje/use-set-enhet-hvis-enhet-i-url';
import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';

export function RedirectPortefolje(props: React.PropsWithChildren<{}>) {
    useRedirectOnMount();

    const {hasError} = useSetInitalEnhet();

    if (hasError) {
        return <AlertStripe type="feil">Noe gikk feil, prøv igjen senere.</AlertStripe>;
    }

    return <>{props.children}</>;
}
