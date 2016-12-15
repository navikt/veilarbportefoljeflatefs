import React, { PropTypes as PT } from 'react';
import { Link } from 'react-router';

function Lenker() {
    return (
        <div className="lenker">
            <Link to="enhet">
                Enhet
            </Link>
            <Link to="portefolje" >
                Portefølje
            </Link>
        </div>
    );
}

Lenker.propTypes = {};

export default Lenker;
