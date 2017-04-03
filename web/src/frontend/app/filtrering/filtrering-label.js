import React, { PropTypes as PT } from 'react';
import { lagConfig } from './filter-konstanter'

function FiltreringLabel({ label, slettFilter }) {
    return (
        <button className="filtreringlabel typo-avsnitt" onClick={slettFilter}>
            <span className="filtreringlabel__label">{lagConfig(label).label}</span>
            <span>X</span>
        </button>
    );
}

FiltreringLabel.propTypes = {
    label: PT.oneOfType([PT.string, PT.shape({ label: PT.string })]).isRequired,
    slettFilter: PT.func.isRequired
};

export default FiltreringLabel;
