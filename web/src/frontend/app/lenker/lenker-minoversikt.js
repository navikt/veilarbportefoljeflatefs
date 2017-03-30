import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

function LenkerMinoversikt({ routes, minOversiktOnClick }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        return lenke === valgtSide ? 'valgt' : 'ikke-valgt';
    }
    return (
        <div className="lenker blokk-m">
            <Link to="portefolje" onClick={minOversiktOnClick} className={`typo-undertittel ${erValgt('portefolje')}`}>
                <FormattedMessage id="lenker.min.oversikt" />
            </Link>
        </div>
    );
}

LenkerMinoversikt.propTypes = {
    routes: PT.arrayOf(PT.object),
    minOversiktOnClick: PT.func.isRequired
};

export default LenkerMinoversikt;
