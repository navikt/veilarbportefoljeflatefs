import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { veilederShape } from '../proptype-shapes';

function LenkerMinoversikt({ routes, veileder }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        console.log(valgtSide);
        return lenke === valgtSide;
    }
    return (
        <div className="lenker blokk-m">
            <Link
                to={{
                    pathname: `portefolje/${veileder.ident}`
                }}
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                aria-selected={erValgt('portefolje(/:ident)')}
            >
                <FormattedMessage id="lenker.min.oversikt" />
            </Link>
        </div>
    );
}

LenkerMinoversikt.propTypes = {
    routes: PT.arrayOf(PT.object),
    veileder: veilederShape.isRequired
};

export default LenkerMinoversikt;
