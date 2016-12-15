import React from 'react';
import { Link } from 'react-router';

function Lenker() {
    return (
        <div className="lenker blokk-m">
            <Link to="enhet" className="tab-link typo-undertittel">
                Enhet
            </Link>
            <Link to="portefolje" className="tab-link typo-undertittel">
                Portefølje
            </Link>
        </div>
    );
}

Lenker.propTypes = {};

export default Lenker;
