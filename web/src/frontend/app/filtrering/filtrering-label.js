import React, { PropTypes as PT } from 'react';

function FiltreringLabel({ label, slettFilter }) {
    return (
        <button className="filtreringlabel typo-avsnitt" onClick={slettFilter}>
            <span className="filtreringlabel__label">{label}</span>
            <span>X</span>
        </button>
    );
}

FiltreringLabel.propTypes = {
    label: PT.string.isRequired,
    slettFilter: PT.func.isRequired
};

export default FiltreringLabel;
