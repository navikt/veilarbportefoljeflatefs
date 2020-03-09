import {useRedirectOnMount} from "./hooks/use-redirect-on-mount";
import {useSetInitalEnhet} from "./hooks/portefolje/use-set-enhet-hvis-enhet-i-url";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import React from "react";

export function RedirectPortefolje(props: React.PropsWithChildren<{}>) {
    useRedirectOnMount();

    const {hasError} = useSetInitalEnhet();

    if (hasError) {
        return <AlertStripeFeil>Noe gikk feil, prøv igjen senere.</AlertStripeFeil>
    }

    return (
        <>
            {props.children}
        </>
    )
}