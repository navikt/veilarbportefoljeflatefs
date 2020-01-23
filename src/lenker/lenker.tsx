import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';
import { useIdentSelector } from '../hooks/redux/use-inlogget-ident';
import { useParams } from 'react-router';
import './lenker.less';
import Toasts from "../components/toast/toast";

function Lenker(props: {harPortefolje: boolean}) {

    const veilederIdent = useIdentSelector();
    const {ident} = useParams();

    const aktivLink = ident ?
        veilederIdent!.ident === ident
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
            <Toasts/>
            <EndringsloggTourWrapper/>
        </div>
    );
}

export default Lenker;
