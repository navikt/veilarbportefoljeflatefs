import React, { PropTypes as PT } from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';

function FiltreringLabel({ label, slettFilter }) {
    return (
        <EtikettInfo className="filtrering-label">
            {label}
            <button className="filtrering-label-slett" onClick={slettFilter}>X</button>
        </EtikettInfo>
    );
}

FiltreringLabel.propTypes = {
    label: PT.string.isRequired,
    slettFilter: PT.func.isRequired
};

export default FiltreringLabel;
