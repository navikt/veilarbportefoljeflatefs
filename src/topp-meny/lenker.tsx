import React from 'react';
import {useIdentSelector} from '../hooks/redux/use-innlogget-ident';
import {useParams} from 'react-router';
import {useVeilederHarPortefolje} from '../hooks/portefolje/use-veileder-har-portefolje';
import {NavLink} from 'react-router-dom';
import {getSidestorrelseFromUrl} from '../utils/url-utils';
import {IdentParam} from '../model-interfaces';
import {fjernBrukerIKontekst} from '../ducks/bruker-i-kontekst';

export function Lenker(props: {erPaloggetVeileder: boolean}) {
    const veilederIdent = useIdentSelector();
    const {ident} = useParams<IdentParam>();
    const harPortefolje = useVeilederHarPortefolje();
    const aktivLink = ident ? (veilederIdent!.ident === ident ? 'oversiktslenke--valgt' : '') : 'oversiktslenke--valgt';

    const erAktiv = id => {
        const elem = document.getElementById(id);
        if (elem) {
            return elem.className.includes('oversiktslenke typo-undertittel oversiktslenke--valgt');
        }
    };

    const sidestorrelse = getSidestorrelseFromUrl();

    return (
        <div className="oversikt-overskrifter" aria-label="Naviger mellom de forskjellige oversiktene.">
            <NavLink
                onClick={() => {
                    if (!window.location.pathname.startsWith('/portefolje')) {
                        fjernBrukerIKontekst();
                    }
                }}
                to={{
                    pathname: '/portefolje',
                    search: '?sidestorrelse=' + sidestorrelse
                }}
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
                onClick={() => {
                    if (!window.location.pathname.startsWith('/enhet')) {
                        fjernBrukerIKontekst();
                    }
                }}
                to={{
                    pathname: '/enhet',
                    search: '?sidestorrelse=' + sidestorrelse
                }}
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
                onClick={() => {
                    if (!window.location.pathname.startsWith('/veiledere')) {
                        fjernBrukerIKontekst();
                    }
                }}
                to={{
                    pathname: '/veiledere',
                    search: '?sidestorrelse=' + sidestorrelse
                }}
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
        </div>
    );
}
