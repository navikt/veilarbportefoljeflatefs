import React from 'react';
import { FormattedMessage } from 'react-intl';

function Laster() {
    return (
        <div className="innholdslaster">
            <FormattedMessage id="spinner">
                {label => <div className="spinner">ITSA LOADING</div>}
            </FormattedMessage>
        </div>
    );
}

export default Laster;
