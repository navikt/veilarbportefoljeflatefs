import React from 'react';
import {Loader} from '@navikt/ds-react';

function Laster() {
    return (
        <div className="innholdslaster">
            <Loader size="xlarge" />
        </div>
    );
}

export default Laster;
