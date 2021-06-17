import React from 'react';
import {useIdentSelector} from '../hooks/redux/use-innlogget-ident';
import {useParams} from 'react-router';
import {useVeilederHarPortefolje} from '../hooks/portefolje/use-veileder-har-portefolje';
import {NavLink} from 'react-router-dom';

export function Lenker(props: {erPaloggetVeileder: boolean}) {
    const veilederIdent = useIdentSelector();
    const {ident} = useParams();
    const harPortefolje = useVeilederHarPortefolje();
    const aktivLink = ident ? (veilederIdent!.ident === ident ? 'oversiktslenke--valgt' : '') : 'oversiktslenke--valgt';

    const erAktiv = id => {
        const elem = document.getElementById(id);
        if (elem) {
            return elem.className.includes('oversiktslenke typo-undertittel oversiktslenke--valgt');
        }
    };

    return (
        <div className="oversikt-overskrifter" aria-label="Naviger mellom de forskjellige oversiktene.">
            <NavLink
                to="/portefolje"
                className="oversiktslenke typo-undertittel"
                activeClassName={aktivLink}
                id="min-oversikt"
                title="Her vises alle brukere som er tildelt deg"
                aria-label="Min oversikt"
                data-testid="min-oversikt"
                hidden={!(harPortefolje || props.erPaloggetVeileder)}
                aria-selected={erAktiv('min-oversikt')}
            >
                Min oversikt
            </NavLink>
            <NavLink
                to="/enhet"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                id="enhetens-oversikt"
                title="Her vises alle brukere som tilhører enheten"
                aria-label="Enhetens oversikt"
                data-testid="enhetens-oversikt"
                aria-selected={erAktiv('enhetens-oversikt')}
            >
                Enhetens oversikt
            </NavLink>
            <NavLink
                to="/veiledere"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                title="Her vises alle veilederne som tilhører enheten"
                id="veileder-oversikt"
                aria-label="Veilederoversikt"
                data-testid="veileder-oversikt"
                aria-selected={erAktiv('veileder-oversikt')}
            >
                Veilederoversikt
            </NavLink>
            <NavLink
                to="/enhet1/v1"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                id="enhetens-oversikt-v1"
                title="Her vises alle brukere som tilhører enheten"
                aria-label="Enhetens oversikt"
                data-testid="enhetens-oversikt"
                aria-selected={erAktiv('enhetens-oversikt-v1')}
            >
                Enhetens oversikt V1
            </NavLink>
        </div>
    );
}
