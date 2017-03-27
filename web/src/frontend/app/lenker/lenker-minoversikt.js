import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

function LenkerMinoversikt({ routes }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        return lenke === valgtSide;
    }
    return (
        <div className="lenker blokk-m">
            <Link
                to="portefolje"
                className={classNames({ 'typo-undertittel': true, valgt: erValgt('portefolje') })}
                aria-selected={erValgt('portefolje')}
            >
                <FormattedMessage id="lenker.min.oversikt" />
            </Link>
        </div>
    );
}

LenkerMinoversikt.propTypes = {
    routes: PT.arrayOf(PT.object)
};

export default LenkerMinoversikt;
