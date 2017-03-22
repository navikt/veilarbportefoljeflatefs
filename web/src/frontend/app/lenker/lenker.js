import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

function Lenker({ routes }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        return lenke === valgtSide ? 'valgt' : 'ikke-valgt';
    }
    return (
        <div className="lenker blokk-m">
            <Link to="enhet" className={`typo-undertittel ${erValgt('enhet')}`}>
                <FormattedMessage id="lenker.enhet.oversikt" />
            </Link>
            <Link to="veiledere" className={`typo-undertittel ${erValgt('veiledere')}`}>
                <FormattedMessage id="lenker.veiledere.oversikt" />
            </Link>
        </div>
    );
}

Lenker.propTypes = {
    routes: PT.arrayOf(PT.object)
};

export default Lenker;
