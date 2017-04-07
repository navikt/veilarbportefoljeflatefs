import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import ActiveLink from './active-link';

function LenkerMinoversikt({ veilederident }) {
    const LenkeInnhold = <FormattedMessage id="lenker.min.oversikt" />;
    const path = veilederident === null ? 'portefolje' : `portefolje/${veilederident}`;

    return (
        <div className="lenker blokk-m" role="tablist">
            <ActiveLink
                to={path}
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                {LenkeInnhold}
            </ActiveLink>
        </div>
    );
}

LenkerMinoversikt.propTypes = {
    veilederident: PT.string
};

LenkerMinoversikt.defaultProps = {
    veilederident: null
};

export default LenkerMinoversikt;
