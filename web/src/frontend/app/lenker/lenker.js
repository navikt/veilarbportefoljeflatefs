import React from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ActiveLink from './active-link';

function Lenker() {
    const EnhetensOversikt = <FormattedMessage id="lenker.enhet.oversikt" />;
    const Veilederoversikt = <FormattedMessage id="lenker.veiledere.oversikt" />;

    return (
        <div className="lenker blokk-m" role="tablist">
            <ActiveLink
                to="enhet"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                {EnhetensOversikt}
            </ActiveLink>
            <ActiveLink
                to="veiledere"
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                {Veilederoversikt}
            </ActiveLink>
        </div>
    );
}

export default withRouter(Lenker);
