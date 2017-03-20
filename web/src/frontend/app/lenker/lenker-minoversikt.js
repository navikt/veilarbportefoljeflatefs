import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';

function LenkerMinoversikt({ routes }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        return lenke === valgtSide ? 'valgt' : 'ikke-valgt';
    }
    return (
        <div className="lenker blokk-m">
            <Link to="portefolje" className={`typo-undertittel ${erValgt('portefolje')}`}>
                Min oversikt
            </Link>
        </div>
    );
}

LenkerMinoversikt.propTypes = {
    routes: PT.arrayOf(PT.object)
};

export default LenkerMinoversikt;
