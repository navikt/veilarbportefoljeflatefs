import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

function Lenker({ routes }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        return lenke === valgtSide;
    }
    return (
        <div className="lenker blokk-m">
            <Link
                to="enhet"
                className={classNames({ 'typo-undertittel': true, valgt: erValgt('enhet') })}
                aria-selected={erValgt('enhet')}
            >
                <FormattedMessage id="lenker.enhet.oversikt" />
            </Link>
            <Link
                to="veiledere"
                className={classNames({ 'typo-undertittel': true, valgt: erValgt('veiledere') })}
                aria-selected={erValgt('veiledere')}
            >
                <FormattedMessage id="lenker.veiledere.oversikt" />
            </Link>
        </div>
    );
}

Lenker.propTypes = {
    routes: PT.arrayOf(PT.object)
};

export default Lenker;
