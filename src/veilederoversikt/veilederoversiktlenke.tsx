import React from 'react';
import { Link } from 'react-router-dom';

export default function VeilederoversiktLenke() {
    return (
        <Link to="/veiledere" className="typo-normal tilbaketilveileder">
            <i className="chevron--venstre" />
            <span>Til veilederoversikt</span>
        </Link>
    );
}
