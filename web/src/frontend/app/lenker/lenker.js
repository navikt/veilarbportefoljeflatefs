import React from 'react';
import { FormattedMessage } from 'react-intl';
import ActiveLink from './active-link';

function Lenker() {
    return (
        <div className="lenker blokk-m" role="tablist">
            <ActiveLink
                to="enhet"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                <FormattedMessage id="lenker.enhet.oversikt" />
            </ActiveLink>
            <ActiveLink
                to="veiledere"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                <FormattedMessage id="lenker.veiledere.oversikt" />
            </ActiveLink>
        </div>
    );
}

export default Lenker;
