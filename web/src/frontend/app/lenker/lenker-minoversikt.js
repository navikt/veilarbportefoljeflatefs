import React, { PropTypes as PT } from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ActiveLink from './active-link';

function LenkerMinoversikt({ veilederident, minOversiktOnClick }) {
    const LenkeInnhold = <FormattedMessage id="lenker.min.oversikt" />;
    const path = veilederident === null ? 'portefolje' : `portefolje/${veilederident}`;

    return (
        <div className="lenker blokk-m" role="tablist">
            <ActiveLink
                to={path}
                onClick={minOversiktOnClick}
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                {LenkeInnhold}
            </ActiveLink>
        </div>
    );
}

LenkerMinoversikt.defaultProps = {
    veilederident: undefined
};

LenkerMinoversikt.propTypes = {
    minOversiktOnClick: PT.func.isRequired,
    veilederident: PT.string
};

export default withRouter(LenkerMinoversikt);
