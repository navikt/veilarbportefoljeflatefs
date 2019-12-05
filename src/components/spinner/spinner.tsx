import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';

function Spinner() {
    return (
        <div className="nav-spinner" aria-describedby="Nav frontend spinner">
            <NavFrontendSpinner type="XL"/>
        </div>
    );
}

export default Spinner;
