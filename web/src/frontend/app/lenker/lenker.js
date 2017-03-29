import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

function Lenker() {
    return (
        <div className="lenker blokk-m">
            <Link to="enhet" className="oversiktslenke typo-undertittel" activeClassName="oversiktslenke--valgt">
                <FormattedMessage id="lenker.enhet.oversikt" />
            </Link>
            <Link to="veiledere" className="oversiktslenke typo-undertittel" activeClassName="oversiktslenke--valgt">
                <FormattedMessage id="lenker.veiledere.oversikt" />
            </Link>
        </div>
    );
}

export default Lenker;
