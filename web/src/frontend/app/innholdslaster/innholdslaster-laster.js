import React, { PropTypes as PT } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';

function Laster({ storrelse }) {
    return (
        <div className="innholdslaster">
            <NavFrontendSpinner storrelse={storrelse} />
        </div>
    );
}

Laster.propTypes = {
    storrelse: PT.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'])
};
Laster.defaultProps = {
    storrelse: 'xxl'
};

export default Laster;
