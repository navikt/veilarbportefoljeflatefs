import React from 'react';
import {useIdentSelector} from '../hooks/redux/use-inlogget-ident';
import {useParams} from 'react-router';
import {useVeilederHarPortefolje} from '../hooks/portefolje/use-veileder-har-portefolje';
import {NavLink} from 'react-router-dom';

export function Lenker(props: {erPaloggetVeileder: boolean}) {
    const veilederIdent = useIdentSelector();
    const {ident} = useParams();
    const harPortefolje = useVeilederHarPortefolje();
    const aktivLink = ident ? (veilederIdent!.ident === ident ? 'oversiktslenke--valgt' : '') : 'oversiktslenke--valgt';
    return (
        <div className="oversikt-overskrifter" aria-label="Naviger mellom de forskjellige oversiktene.">
            <NavLink
                to="/portefolje"
                className="oversiktslenke typo-undertittel"
                activeClassName={aktivLink}
                id='min-oversikt'
                title="Her vises alle brukere som er tildelt deg"
                aria-label="Her vises alle brukere som er tildelt deg"
                data-testid="min-oversikt"
                hidden={!(harPortefolje || props.erPaloggetVeileder)}
            >
                Min oversikt
            </NavLink>
            <NavLink
                to="/enhet"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                id="enhetens-oversikt"
                title="Her vises alle brukere som tilhører enheten"
                aria-label="Her vises alle brukere som tilhører enheten"
                data-testid="enhetens-oversikt"
            >
                Enhetens oversikt
            </NavLink>
            <NavLink
                to="/veiledere"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                title="Her vises alle veilederne som tilhører enheten"
                id="veileder-oversikt"
                aria-label="Her vises alle veilederne som tilhører enheten"
                data-testid="veileder-oversikt"
            >
                Veilederoversikt
            </NavLink>
        </div>
    );
}
