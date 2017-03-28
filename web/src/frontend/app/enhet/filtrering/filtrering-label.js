import React, { PropTypes as PT } from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';

function FiltreringLabel({ label, slettFilter }) {
    return (
        <div className="filtrering-label">
            <EtikettInfo>
                {label}
            </EtikettInfo>
            <button className="filtrering-label-slett" onClick={slettFilter}>X
            </button>
        </div>
    );
}

FiltreringLabel.propTypes = {
    label: PT.string.isRequired,
    slettFilter: PT.func.isRequired
};

export default FiltreringLabel;
