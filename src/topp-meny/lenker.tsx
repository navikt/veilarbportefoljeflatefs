import ActiveLink from "./active-link";
import React from "react";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {useParams} from "react-router";

export function Lenker (props: {harPortefolje}) {
    const veilederIdent = useIdentSelector();
    const {ident} = useParams();

    const aktivLink = ident ?
        veilederIdent!.ident === ident
            ? 'oversiktslenke--valgt'
            : ''
        : 'oversiktslenke--valgt';
    return (
        <>
            <h2 className="h2__lenke">
                <ActiveLink
                    to="/portefolje"
                    className="oversiktslenke typo-undertittel"
                    activeClassName={aktivLink}
                    title="Her vises alle brukere som er tildelt deg"
                    hidden={!props.harPortefolje}
                >
                    Min oversikt
                </ActiveLink>
            </h2>

            <h2 className="h2__lenke">
                <ActiveLink
                    to="/enhet"
                    className="oversiktslenke typo-undertittel"
                    activeClassName="oversiktslenke--valgt"
                    title="Her vises alle brukere som tilhører enheten"
                >
                    Enhetens oversikt
                </ActiveLink>
            </h2>

            <h2 className="h2__lenke">
                <ActiveLink
                    to="/veiledere"
                    className="oversiktslenke typo-undertittel"
                    activeClassName="oversiktslenke--valgt"
                    title="Her vises alle veilederne som tilhører enheten"
                >
                    Veilederoversikt
                </ActiveLink>
            </h2>
        </>
    )
}