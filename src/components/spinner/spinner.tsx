import React from 'react';
import './spinner.less';
import {Loader} from '@navikt/ds-react';

function Spinner() {
    return (
        <div className="nav-spinner" aria-describedby="Nav frontend spinner">
            <Loader size="xlarge" />
        </div>
    );
}

export default Spinner;
