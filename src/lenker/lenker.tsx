import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';
import { useSelector } from 'react-redux';
import { AppState } from '../reducer';
import { useIdentSelector } from '../hooks/redux/use-enheter-ident';
import { useParams } from 'react-router';

function Lenker() {
    const portefoljeStorrelse = useSelector((state: AppState) => state.statustallInloggetVeileder.data.totalt);
    const harPortefolje = portefoljeStorrelse > 0;

    const veilederIdent = useIdentSelector();
    const {ident} = useParams();
    console.log('identUrl', ident);
    console.log('ident', veilederIdent);

    const aktivLink = ident ?
        veilederIdent === ident
            ? 'oversiktslenke--valgt'
            : ''
        : 'oversiktslenke--valgt';

    console.log('aktiv', veilederIdent === ident);
    console.log('aktivlinkj:', aktivLink);

    return (
        <div className="lenker" role="tablist">
            <h2 className="h2__lenke">
                <ActiveLink
                    to="/portefolje"
                    className="oversiktslenke typo-undertittel"
                    activeClassName={aktivLink}
                    title="Her vises alle brukere som er tildelt deg eller veilederen du er inne på"
                    hidden={!harPortefolje}
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
