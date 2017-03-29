import React from 'react';
import { FormattedMessage } from 'react-intl';

function Laster() {
    // TODO Få inn spinner fra nav-frontend
    return (
        <div className="innholdslaster">
            <FormattedMessage id="spinner">
                {(label) => <div className="spinner">ITSA LOADING: {label}</div>}
            </FormattedMessage>
        </div>
    );
}

export default Laster;
