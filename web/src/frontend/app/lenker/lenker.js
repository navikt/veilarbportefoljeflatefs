import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';

function Lenker({ routes }) {
    const valgtSide = routes[1].path;
    function erValgt(lenke) {
        return lenke === valgtSide ? 'valgt' : 'ikke-valgt';
    }
    return (
        <div className="lenker blokk-m">
            <Link to="enhet" className={`typo-undertittel ${erValgt('enhet')}`}>
                Enhet
            </Link>
            <Link to="portefolje" className={`typo-undertittel ${erValgt('portefolje')}`}>
                Portefølje
            </Link>
        </div>
    );
}

Lenker.propTypes = {
    routes: PT.object
};

export default Lenker;
