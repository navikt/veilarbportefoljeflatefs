import React from 'react';
import {FormattedMessage} from 'react-intl';
import ActiveLink from "./active-link";
import Endringslogg from "../components/endringslogg/endringslogg"
function Lenker() {
    return (
        <div className="lenker blokk-m" role="tablist">
            <h2 className="h2__lenke">
                <ActiveLink
                    to="/enhet"
                    className="oversiktslenke typo-undertittel"
                    activeClassName="oversiktslenke--valgt"
                >
                    <FormattedMessage id="lenker.enhet.oversikt"/>
                </ActiveLink>
            </h2>
            <h2 className="h2__lenke">
                <ActiveLink
                    to="/veiledere"
                    className="oversiktslenke typo-undertittel"
                    activeClassName="oversiktslenke--valgt"
                >
                    <FormattedMessage id="lenker.veiledere.oversikt"/>
                </ActiveLink>
            </h2>
            <Endringslogg/>
        </div>
    );
}

export default Lenker;
