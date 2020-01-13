import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';
import { useSelector } from 'react-redux';
import { AppState } from '../reducer';
import { useIdentSelector } from '../hooks/redux/use-enheter-ident';
import { useLocation, useParams } from 'react-router';

function Lenker() {
    const portefoljeStorrelse = useSelector((state: AppState) => state.statustallInloggetVeileder.data.totalt);
    const harPortefolje = portefoljeStorrelse > 0;

    const veilederIdent = useIdentSelector();
    const {ident} = useParams();

    const portefoljeUrl = useLocation().pathname;

    const skjulMinOversiktLenke = !harPortefolje ? portefoljeUrl !== '/portefolje' : false;

    const aktivLink = ident ?
        veilederIdent === ident
            ? 'oversiktslenke--valgt'
            : ''
        : 'oversiktslenke--valgt';

    return (
        <div className="lenker" role="tablist">
            <h2 className="h2__lenke">
                <ActiveLink
                    to="/portefolje"
                    className="oversiktslenke typo-undertittel"
                    activeClassName={aktivLink}
                    title="Her vises alle brukere som er tildelt deg"
                    hidden={skjulMinOversiktLenke}
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
            <EndringsloggTourWrapper/>
        </div>
    );
}

export default Lenker;
