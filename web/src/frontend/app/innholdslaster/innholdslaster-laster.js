import React from 'react';
import Spinner from 'nav-react-design/dist/spinner';
import { FormattedMessage } from 'react-intl';

function Laster() {
    return (
        <div className="innholdslaster">
            <FormattedMessage id="spinner">
                {label => <Spinner storrelse="xxl" aria-label={label} />}
            </FormattedMessage>
        </div>
    );
}

export default Laster;
