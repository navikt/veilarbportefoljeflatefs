import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';

function Lenker() {
    return (
        <div className="lenker blokk-m" role="tablist">
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
