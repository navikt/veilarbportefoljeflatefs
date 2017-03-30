import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

function LenkerMinoversikt({ minOversiktOnClick }) {
    return (
        <div className="lenker blokk-m">
            <Link to="portefolje" onClick={minOversiktOnClick} className="oversiktslenke typo-undertittel" activeClassName="oversiktslenke--valgt">
                <FormattedMessage id="lenker.min.oversikt" />
            </Link>
        </div>
    );
}

LenkerMinoversikt.propTypes = {
    minOversiktOnClick: PT.func.isRequired
};

export default LenkerMinoversikt;
