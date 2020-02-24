import {useRedirectOnMount} from "./hooks/use-redirect-on-mount";
import {useFetchEnheter} from "./hooks/portefolje/use-fetch-enheter-hvis-enhet-i-url";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import React from "react";

export function RedirectPortefolje(props: React.PropsWithChildren<{}>) {
    useRedirectOnMount();

    const {hasError} = useFetchEnheter();

    if (hasError) {
        return <AlertStripeFeil>Noe gikk feil, prøv igjen senere.</AlertStripeFeil>
    }

    return (
        <>
            {props.children}
        </>
    )
}